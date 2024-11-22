import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SingupPage";
import AllReportPage from "./page/AllReportPage";
import UploadReportForm from "./page/UploadReportForm";
import Dashboard from "./page/Dashboard";
import Chart from "./page/Chart";
import Allchart from "./page/overallchart";
import Newrepo from "./page/pdfreport";

import SiteReport from "./page/SiteReport";
import SiteVisitForm from "./page/SiteVisitForm";

import { NotFound } from "./page/NotFoundPage";
import PdfReport from "./page/pdfreport";
import FormDesign from "./page/FormDesign";
import Logout from "./page/Logout";
import UserProfile from "./page/UserProfile";
import UpdatePasswordPage from "./page/UpdatePasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/allReport" element={<AllReportPage />} />
        <Route path="/allReport/:id" element={<SiteReport />} />
        <Route path="/pdf/:id" element={<PdfReport />} />
        <Route path="/uploadReport" element={<UploadReportForm />} />
        <Route path="/finalform" element={<SiteVisitForm />} />{" "}
        <Route path="/profile" element={<Dashboard />}>
          <Route index element={<UserProfile />} />
          <Route path="chart" element={<Chart />} />
          <Route path="detailchart" element={<Allchart />} />
          <Route path="updatePassword" element={<UpdatePasswordPage />} />
        </Route>
        <Route path="/pdf" element={<Newrepo />} />
        {/* fully working form is Fromdesign */}
        <Route path="/formdesign" element={<FormDesign />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
