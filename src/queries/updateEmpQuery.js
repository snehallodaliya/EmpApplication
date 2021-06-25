import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";

async function fetchEmpsRequest() {
    const response=await fetch("http://localhost:4000/Employee/");
    console.log("response test")
    return response.DATA.data.json();
}

const EmpList = () => {
    // const { data, status } = useQuery("emps", fetchEmpsRequest);
    // if(status === 'success'){
    //     return data;
    // }
}

async function createEmpsRequest(empData) {
    const response = await fetch("http://localhost:4000/Employee/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
    });
    const data = await response.json();
    const { emp } = data;
    return emp;
}

function useCreateEmp() {
    return useMutation(createEmpsRequest, {
        onMutate: (empData) => {
            // 1) cancel queries
            queryCache.cancelQueries("emps");

            // 2) save snapshot
            const snapshot = queryCache.getQueryData("emps");

            // 3) optimistically update cache
            queryCache.setQueryData("emps", (prev) => [
                ...prev,
                {
                    id: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    ...empData,
                },
            ]);

            // 4) return rollback function which reset cache back to snapshot
            return () => queryCache.setQueryData("emps", snapshot);
        },
        onError: (error, empData, rollback) => rollback(),
        onSettled: () => queryCache.invalidateQueries("emps"),
    });
}

module.export = {
    fetchEmpsRequest,
    useCreateEmp,
    EmpList
}
