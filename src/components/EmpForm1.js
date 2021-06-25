import { React, useState } from "react";
import axios from "axios";
import FormComponent from "./../components/FormComponent";
import { useQueryClient, useMutation } from "react-query";
import EmpTable1 from "./../components/EmpTable1";

const EmpForm1 = () => {
  const [errors, setErrors] = useState({});
  const initialFormState = {
    Ecode: "",
    Ename: "",
    BOD: "",
    Age: 0,
    ContactNo: "",
  };
  const [emp, setEmp] = useState(initialFormState);
  const handleInputChange = (key, value) => {
    setEmp({ ...emp, [key]: value });
  };
  const queryClient = useQueryClient();
//   const { status, data, error, isFetching } = useQuery(
//     "getEmpList",
//     async () => {
//       const res = await axios.get("http://localhost:4000/Employee/");
//       return res.data.DATA.data;
//     }
//   );

  const addEmpMutation = useMutation(
    (emp1) =>
      axios.post("http://localhost:4000/Employee/create", emp1, {
        headers: { "Content-Type": "application/json" },
      }),
    {
      onMutate: async (emp1) => {
        console.log("test emp1", emp1);
        setEmp(initialFormState);
        await queryClient.cancelQueries("getEmpList");

        const previousValue = queryClient.getQueryData("getEmpList");

        queryClient.setQueryData("getEmpList", (old) => ({
          ...old,
          data: [...old, emp1],
        }));

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData("getEmpList", previousValue),
      // After success or failure, refetch the todos query
      onSettled: () => {
        queryClient.invalidateQueries("getEmpList");
      },
    }
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addEmpMutation.mutate(emp);
        }}
      >
        <FormComponent
          error={errors.Ecode}
          label="Code"
          type="text"
          name="Ecode"
          placeholder="Please Enter your code"
          value={emp.Ecode}
          onChange={(e) => handleInputChange("Ecode", e.target.value)}
        />
        <FormComponent
          error={errors.Ename}
          label="Name"
          type="text"
          name="Ename"
          placeholder="Please Enter your Ename"
          value={emp.Ename}
          onChange={(e) => handleInputChange("Ename", e.target.value)}
        />
        <FormComponent
          error={errors.BOD}
          label="BOD"
          type="text"
          name="BOD"
          placeholder="Please Enter your bod"
          value={emp.BOD}
          onChange={(e) => handleInputChange("BOD", e.target.value)}
        />
        <FormComponent
          error={errors.Age}
          label="Age"
          type="text"
          name="Age"
          placeholder="Please Enter your age"
          value={emp.Age}
          onChange={(e) => handleInputChange("Age", e.target.value)}
        />
        <FormComponent
          error={errors.ContactNo}
          label="ContactNo"
          type="text"
          name="ContactNo"
          placeholder="Please Enter your ContactNo"
          value={emp.ContactNo}
          onChange={(e) => handleInputChange("ContactNo", e.target.value)}
        />

        <button className="btn btn-info">
          {" "}
          {addEmpMutation.isLoading ? "Creating..." : "Create"}
        </button>
      </form>
      <br />

      <div>Updated At: {new Date().getDate()}</div>
      <ul>
        <EmpTable1 />
        {/* {data.map((datum) => (
            console.log("Check list",datum)
            ))} */}
      </ul>
      {/* <div>{isFetching ? "Updating in background..." : " "}</div> */}
    </>
  );
};
export default EmpForm1;
