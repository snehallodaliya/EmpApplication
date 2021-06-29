import React from "react";
import {useUsers} from './../queries/useEmpList';

const EmpTable1 = () => {
    const [empTableData, setEmpTableData] = React.useState();
    // async function fetchEmps(page = 0) {
    //     const { data } = await axios.get('http://localhost:4000/Employee/')
    //     return data.DATA.data
    //   }
    const {data,status}=useUsers("getEmp");
  return (
    <div>
      <h2>People</h2>
      

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <table className="customTable">
          <thead>
            <tr>
              <th scope="col">ECode</th>
              <th scope="col">EName</th>
              <th scope="col">BOD</th>
              <th scope="col"> Age</th>
              <th scope="col">ContactNo</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.Ecode}</td>
                  <td>{emp.Ename}</td>
                  <td>{emp.BOD}</td>
                  <td>{emp.Age}</td>
                  <td>{emp.ContactNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Emps</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpTable1;
