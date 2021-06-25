import React from "react";
import '../App.css';
function FormField({ name, label, error, ...rest }) {
    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={name} style={{float:"left"}} className="customLabel">{label}</label>
                <input className="form-control" id={name} name={name} {...rest} />
                <small className="error">{error}</small>
            </div>
        </React.Fragment>
    );
}

export default FormField;
