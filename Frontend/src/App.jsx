// import React from 'react'
// import Registration from './components/Registration'
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (

// <div className="min-h-screen w-full  bg-black">

//     <div
//       className=""
//       style={{
//         background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
//       }}
//     />
//      <ToastContainer position="top-right" autoClose={3000} />

//     <Registration/>

//   </div>

//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "./components/Students";
import Registration from "./components/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full  bg-black">
        <div
          className=""
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
          }}
        />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/students" element={<Students />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
