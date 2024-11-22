/* eslint-disable no-unused-vars */
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const truncateText = (text, limit) => {
  if (!text) return ""; // Handle cases where text might be undefined
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const AllReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(function () {
    async function fetchReportData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/sitereport`
        );
        console.log("response ", response.data.data.data); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        const allReport = response.data.data.data;
        if (allReport.length === 0) {
          throw new Error("No crops found");
        }
        setReportData(allReport);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReportData();
  }, []);
  return (
    <>
      <div className=" mx-auto max-w-screen-xl p-6">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-blue-400 mb-8 ">All Report</h1>
          <hr className="border-t-4 border-blue-600  mx-auto" />
        </div>
        {/* Search Button */}

        <label className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
            name="topic"
          />
          <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-m tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium border-transparent py-1.5 h-[38px] -mr-3">
            Search
          </button>
        </label>

        {/* Report container */}
        {/*  <div className="flex flex-col gap-6 p-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {reportData.map((report) => (
              <div
                key={report._id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
              >
                <div className="p-5 ">
                  <h2 className="text-2xl font-semibold text-green-500 mb-4">
                    Report Name
                  </h2>

                  <p className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">
                      Engineer:
                    </span>
                    <span className="text-gray-600">
                      {report.jmStaffEngineer.name}
                    </span>
                  </p>
                  <p className="flex items-center mt-3">
                    <span className="font-semibold text-gray-700 w-32">
                      Client:
                    </span>
                    <span className="text-gray-600">{report.clientName}</span>
                  </p>
                  <p className="flex items-center mt-2">
                    <span className="font-semibold text-gray-700 w-32">
                      Architect:
                    </span>
                    <span className="text-gray-600">
                      {report.architectName}
                    </span>
                  </p>
                  <p className="flex items-center mt-2">
                    <span className="font-semibold text-gray-700 w-32">
                      Report Created On:
                    </span>
                    <span className="text-gray-600 ">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                  </p>

                  <div className="flex justify-end mt-8 ">
                    <Link to={`/allReport/${report._id}`}>
                      <button className=" bg-gray-600 text-white px-2 py-2 rounded hover:bg-blue-700">
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex flex-col gap-6 p-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {reportData.map((report) => (
              <div
                key={report._id}
                className="bg-blue-50 border border-gray-300 rounded-lg shadow-lg p-6"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-600 mb-6 text-center">
                    Report Name
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Engineer:
                      </span>
                      <span className="text-gray-600">
                        {report.jmStaffEngineer?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Client:
                      </span>
                      <span className="text-gray-600">{report.clientName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Architect:
                      </span>
                      <span className="text-gray-600">
                        {report.architectName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Report Created On:
                      </span>
                      <span className="text-gray-600">
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Link to={`/allReport/${report._id}`}>
                      <button className="bg-slate-950  text-white px-4 py-2 rounded-md shadow-lg hover:bg-slate-700 hover:scale-105 transition-transform">
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReportPage;
