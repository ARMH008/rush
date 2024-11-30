import { useState, useEffect } from "react";
import axios from "axios";
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
          const response = await axiosInstance.get("/users/user");
        console.log("repsonse", response.data);
        setUserData(response.data);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, isLoading, error };
};

export default useUserData;
