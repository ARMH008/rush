/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SingupPage";
import AllReportPage from "./page/AllReportPage";
import UploadReportForm from "./page/UploadReportForm";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/allReport" element={<AllReportPage />} />
        <Route path="/uploadReport" element={<UploadReportForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
