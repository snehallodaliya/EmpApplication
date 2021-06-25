import React, { useState, useEffect } from 'react';
import FormComponent from './FormComponent';
import { validationSchema } from '../validaitons/EmpValidation';
import '../App.css';


const EmpTable = (props) => {
    const [emp, setEmp] = useState(props.emps[props.inEditMode.rowKey])
    useEffect(() => {
        setEmp(props.emps[props.inEditMode.rowKey])
    }, [props])
    const updateEmp = (emp) => {
        props.updateEmp(emp.id, emp)
    }
    const cancelEdit = (() => {
        props.cancelEdit()
    })
    const handleInputChange = (key, value, emp) => {
        setEmp(emp[key] = value)
    }


    return (

        <table className="customTable">
            <thead>
                <tr>
                    <th scope="col">ECode</th>
                    <th scope="col">EName</th>
                    <th scope="col">BOD</th>
                    <th scope="col"> Age</th>
                    <th scope="col">ContactNo</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.emps.length > 0 ? (props.emps.map((emp) => (
                    <tr key={emp.id}>
                        <td>{
                            props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                <input value={emp.Ecode}
                                    onChange={(e) => handleInputChange("Ecode", e.target.value, emp)}
                                />
                            ) : (
                                emp.Ecode
                            )
                        }</td>
                        <td>{
                            props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                <input value={emp.Ename}
                                    onChange={(e) => handleInputChange("Ename", e.target.value, emp)}
                                />
                            ) : (
                                emp.Ename
                            )
                        }</td>
                        <td>{
                            props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                <input value={emp.BOD}
                                    onChange={(e) => handleInputChange("BOD", e.target.value, emp)}
                                />
                            ) : (
                                emp.BOD
                            )
                        }</td>
                        <td>{
                            props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                <input value={emp.Age}
                                    onChange={(e) => handleInputChange("Age", e.target.value, emp)}
                                />
                            ) : (
                                emp.Age
                            )
                        }</td>
                        <td>{
                            props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                <input value={emp.ContactNo}
                                    onChange={(e) => handleInputChange("ContactNo", e.target.value, emp)}
                                />
                            ) : (
                                emp.ContactNo
                            )
                        }</td>
                        <td>
                            {
                                props.inEditMode.status && props.inEditMode.rowKey === emp.id ? (
                                    <React.Fragment>
                                        <button className="btn btn-success customButton" style={{ marginLeft: 8 }} onClick={event => {
                                            event.preventDefault()
                                            updateEmp(emp)
                                        }}>
                                            Save
                                        </button>

                                        <button
                                            className="btn btn-danger customButton"
                                            
                                            onClick={event => {
                                                event.preventDefault()
                                                cancelEdit()
                                            }}
                                        >
                                            Cancel
                                            </button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <button
                                            className={"btn btn-info customButton"}
                                            onClick={() => {
                                                props.editRow(emp)
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className={"btn btn-secondary customButton" } onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { props.deleteEmp(emp.id) } }} > Delete</button>
                                    </React.Fragment>
                                )
                            }
                        </td>
                    </tr>
                ))) : (<tr>
                    <td colSpan={3}>No Emps</td>
                </tr>)}

            </tbody >
        </table >
    )
}

const AddEmpForm = (props) => {
    const initialFormState = { Ecode: '', Ename: '', BOD: '', Age: 0, ContactNo: '' }
    const [emp, setEmp] = useState(initialFormState);
    const [errors, setErrors] = useState({});


    const handleInputChange = (key, value) => {
        setEmp({ ...emp, [key]: value })
    }


    const createEmp = async (event) => {
        event.preventDefault();
        console.log("add emp")
        let formData = {
            Ecode: event.target[0].value,
            Ename: event.target[1].value,
            BOD: event.target[2].value,
            Age: event.target[3].value,
            ContactNo: event.target[4].value,
        }
        try {
            validationSchema.validateSync(
                formData,
                {
                    abortEarly: false
                }
            );
            props.addEmp(emp);
            //setEmp(initialFormState)
        } catch (err) {
            const { inner } = err;
            let formErrors = {};

            if (inner && inner[0]) {
                inner.forEach(error => {
                    const { path, message } = error;

                    if (!formErrors[path]) {
                        formErrors[path] = message;
                    }
                });
            }

            console.log("form errors", formErrors);

            setErrors(formErrors);
        }




    }


    return (

        <form onSubmit={event => createEmp(event)}>

            <FormComponent error={errors.Ecode} label="Code" type="text" name="Ecode" placeholder="Please Enter your code" value={emp.Ecode} onChange={(e) => handleInputChange("Ecode", e.target.value)} />
            <FormComponent error={errors.Ename} label="Name" type="text" name="Ename" placeholder="Please Enter your Ename" value={emp.Ename} onChange={(e) => handleInputChange("Ename", e.target.value)} />
            <FormComponent error={errors.BOD} label="BOD" type="text" name="BOD" placeholder="Please Enter your bod" value={emp.BOD} onChange={(e) => handleInputChange("BOD", e.target.value)} />
            <FormComponent error={errors.Age} label="Age" type="text" name="Age" placeholder="Please Enter your age" value={emp.Age} onChange={(e) => handleInputChange("Age", e.target.value)} />
            <FormComponent error={errors.ContactNo} label="ContactNo" type="text" name="ContactNo" placeholder="Please Enter your ContactNo" value={emp.ContactNo} onChange={(e) => handleInputChange("ContactNo", e.target.value)} />

            <button className="btn btn-info">Add new emp</button>
        </form>
    )
}



export { EmpTable, AddEmpForm }