import React, { useState, useEffect } from 'react';


function ShowEmployee() {
    const [emps, setEmps] = useState([])
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        fetch("http://localhost:4000/employee/").then(
            res => (res.json())).then(data => {
                setEmps(data.DATA.data)
            }).
            catch(err => setHasError(true))
    }, [])
    console.log(emps);
    return (
        <div>
            {hasError ? <div>error</div> : (emps.map((d, i) =>
                <div className="row" key={i}>
                    <div className="col-2" >{d.Ecode}</div>
                    <div className="col-2" >{d.Ename}</div>
                    <div className="col-2" >{d.BOD}</div>
                    <div className="col-2" >{d.Age}</div>
                    <div className="col-2" >{d.ContactNo}</div>
                </div>
            ))}
        </div>


    )
}

export default ShowEmployee;
