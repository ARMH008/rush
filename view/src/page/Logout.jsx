/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
function Logout() {
  //const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await axios.get("api/v1/user/logout");
        //console.log("log out response", res.data.status);
        window.location.assign("/"); // Redirect to homepage
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  });

  return <div></div>;
}

export default Logout;
