import React, { useEffect, useState } from "react";
import { getApi, getStudentOutcomeApi } from "../../api/api";
import loading from "../../assets/loading.svg";

export const StudentOutcome = ({ userId, year, currentSem }) => {

  const [courseCode, setCourseCode] = useState("");
  const [StudentData, setStudentData] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [outComeData, setOutcomeData] = useState([]);

  //#region useEffect
  useEffect(() => {
    getApi(
      `staff/getStaffsDetails?uname=${userId}&sem=${currentSem}&year=` + year,
      setStudentData,
      setIsLoading1
    );
  }, []);
  //#endregion

  //#region handleGet
  const handleGet = () => {
    const data = {
      department: courseCode.split("-")[1],
      code: courseCode.split("-")[0],
      year: year,
    };
    getStudentOutcomeApi(
      `staff/getMarkByCode?code=${data.code}&department=${data.department}&sem=${currentSem}&year=${year}`,
      setOutcomeData
    ).then((res) => {
      console.log(res);
    });
  };
  //#endregion

  return (
    <div className=" w-full h-full p-5">

      <div className=" flex justify-start items-center space-x-5">
        <span className="flex items-center space-x-2">
          <h1 className=" font-medium">Course Code :</h1>
          <select
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className={` border-2 h-[2.8rem] rounded-md px-2 ${
              courseCode === "" ? "text-gray-400" : "text-black font-medium"
            }`}
          >
            <option value="">Select Code</option>

            {StudentData.map((course, index) => (
              <option
                key={index}
                value={
                  course.code.code + "-" + course.code.department.departmentCode
                }
              >
                {course.code.code + "-" + course.code.department.departmentCode}
              </option>
            ))}
          </select>
        </span>

        <button
          className=" bg-[#4f72cc] py-2 px-4 rounded-md text-white"
          onClick={handleGet}
        >
          Get
        </button>
      </div>

      <div className="w-full flex flex-col items-center py-4 mt-5">
        <table className="table-auto border-collapse border text-center mt-4 w-full max-w-[60rem]">
          <thead className="bg-[#4f72cc] text-white">
            <tr>
              <th className="border p-2">S. No.</th>
              <th className="border p-2">Register No</th>
              <th className="border p-2">LOT</th>
              <th className="border p-2">MOT</th>
              <th className="border p-2">HOT</th>
              <th className="border p-2">Attainment</th>
            </tr>
          </thead>
          <tbody>
            {isLoading1 ? (
              <tr>
                <td colSpan="6" className="p-4">
                  <img src={loading} alt="" className="mx-auto h-12 w-12" />
                </td>
              </tr>
            ) : outComeData.length === 0 ? (
              <tr>
                <td colSpan="6" className="font-medium p-4">
                  No Data found
                </td>
              </tr>
            ) : (
              outComeData
                .sort((a, b) => a.regNo.localeCompare(b.regNo))
                .map((item, index) => {
                  // Calculate the required fields
                  const lotSum =
                    (item.marks[0].C1LOT +
                      item.marks[0].C2LOT +
                      item.marks[0].ESELOT +
                      item.marks[0].ASG1 +
                      item.marks[0].ASG2) /
                    3;
                  const motSum =
                    (item.marks[0].C1MOT +
                      item.marks[0].C2MOT +
                      item.marks[0].ESEMOT) /
                    3;
                  const hotSum =
                    item.marks[0].C1HOT +
                    item.marks[0].C2HOT +
                    item.marks[0].ESEHOT;

                  const averageSum = (lotSum + motSum + hotSum) / 3;

                  return (
                    <tr key={index} className="font-medium">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.regNo}</td>
                      <td className="border p-2">
                        {isNaN(lotSum) ? "N/A" : lotSum.toFixed(2)}
                      </td>
                      <td className="border p-2">
                        {isNaN(motSum) ? "N/A" : motSum.toFixed(2)}
                      </td>
                      <td className="border p-2">
                        {isNaN(hotSum) ? "N/A" : hotSum.toFixed(2)}
                      </td>
                      <td className="border p-2">
                        {isNaN(averageSum) ? "N/A" : averageSum.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
