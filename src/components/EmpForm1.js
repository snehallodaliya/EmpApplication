import { React, useState } from "react";
import FormComponent from "./../components/FormComponent";
import EmpTable1 from "./../components/EmpTable1";
import {useUserCreate} from './../queries/useEmpList';

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
  const addEmpMutation = useUserCreate();
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
