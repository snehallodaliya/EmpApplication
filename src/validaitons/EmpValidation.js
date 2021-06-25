import * as yup from "yup";

export let validationSchema = yup.object().shape({
    Ecode: yup
        .string()
        .required("A name is required")
        .min(4, "Name must be at least 2 characters"),
    Ename: yup
        .string()
        .required("A name is required")
        .min(2, "Name must be at least 2 characters"),
    BOD: yup
        .date(),
    Age: yup
        .number()
        .required("Please supply your age")
        .min(0, "You must be at least 18 years")
        .max(60, "You must be at most 60 years"),
    ContactNo: yup
        .string()
        .required("ContactNo is a required field")

});

