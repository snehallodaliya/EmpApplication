import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { apiClient } from "./../config/apiClient";

const getUsers = async () => {
  
  return callAPI("http://localhost:4000/Employee/",{},"GET",{ });
};

function useUsers(queryName) {
    return useQuery(queryName,getUsers )
  //return useQuery("getEmpList", getUsers);
}

async function callAPI(url,data,method,headers) {
  return await apiClient({
    url: `${url}`,
    data: `${JSON.stringify(data)}`,
    method: `${method}`,
    headers: `${JSON.stringify(headers)}`,
  });
}

function CallUseQuery(){
    return useQuery("getEmpList", callAPI("http://localhost:4000/Employee/",{},"GET",{}))
}

function useMutate(){
    const queryClient = useQueryClient();
    return {
        onMutate: async (emp1) => {
          console.log("test emp1", emp1);
          //setEmp(initialFormState);
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
}

function useUserCreate() {
  return useMutation(
    (emp1) => callAPI("http://localhost:4000/Employee/create",emp1,"POST", { "Content-Type": "application/json" })
    ,useMutate()
  );
}

export { useUsers, useUserCreate };
