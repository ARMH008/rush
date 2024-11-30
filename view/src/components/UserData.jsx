import { useState, useEffect } from "react";

//import Cookies from "js-cookie";
import { axiosInstance } from "../lib/axios";

const useUserData = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       /*  const response = await axios.get(
          "https://rush-uctr.onrender.com/api/v1/user/user"
        ); */
          const response = await axiosInstance.get("/user/user",{ withCredentials: true,});
        console.log("repsonse :", response);
        setUserData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
    setError(error.message || "Unknown error");
       
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, isLoading, error };
};

export default useUserData;
