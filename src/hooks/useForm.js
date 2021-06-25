import React from "react";

export function useForm(initialValues) {
  const [values, setValues] = React.useState(initialValues || {});

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  return {
    values,
    onChange
  };
}
