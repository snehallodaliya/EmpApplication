// import "./App.css";
// import {
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// import EmpTable1  from "./components/EmpTable1";
// import EmpForm1  from "./components/EmpForm1";
// const queryClient = new QueryClient();


// function App() {
  
//   return (
//     <>
//     <QueryClientProvider client={queryClient}>
//       <EmpForm1 />
//       {/* <EmpTable1/> */}
//     </QueryClientProvider>
//     </>
//   );
// }
// //serviceWorker.unregister();
// export default App;

import React from "react";
import { Auth } from "./components/Auth";
import { UserInfo } from "./components/UserInfo";
import { useAuth } from "./lib/auth";

// function App() {
//   const { user } = useAuth();
//   return user ?<><h1>test</h1> <UserInfo /> </>: <Auth />;
// }
function App(){
  const { user } = useAuth();
  return (
     user ?<><h1>test</h1> <UserInfo /> </>: <Auth />
  );
}
export default App;
