import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loading from "../assets/loading.svg";
import axios from "axios";
import toast from "react-hot-toast";

const RadioButton = ({ value, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-blue-500"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{value}</span>
    </label>
  );
};

const TextField = ({ text, type, name, value, handleChange }) => {
  return (
    <div className=" flex w-[15rem] xl:w-[16.75rem] justify-center items-center bg-white shadow-sm">
      <label className="relative cursor-pointer">
        <input
          type="text"
          name={name}
          placeholder={name}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          maxLength={30}
          required
          className="bg-[#F8FCFF] shadow-sm border   h-10 w-[15rem] xl:w-[16.75rem] rounded px-2  placeholder-gray-400   text-black  placeholder-opacity-0 transition duration-200"
        />
        <span className="text-md text-gray-400 text-opacity-80 bg-transparent absolute left-2 top-2 px-1 transition duration-200 input-text">
          {text}
        </span>
      </label>
    </div>
  );
};

const addMarks = () => {
  //#region  Variables
  const [courseCode, setCourseCode] = useState("");
  const [classSection, setClassSection] = useState("");
  const [regNo, setRegNo] = useState("");
  const [section, setSection] = useState("");
  const [examType, setExamType] = useState("CIA 1");
  const [isLoading, setIsLoading] = useState(false);
  const [markType, setMarkType] = useState('que');
  const [marks, setMarks] = useState({});
  const [marksget, setMarksget] = useState({});
  const [regNoget, setRegNoget] = useState("");
  const [examTypeget, setExamTypeget] = useState("CIA 1");
  const navigate = useNavigate();
  const questions = [
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "Q5",
    "Q6",
    "Q7",
    "Q8",
    "Q9",
    "Q10",
    "Q11",
    "Q12",
    "Q13",
    "Q14",
    "Q15",
    "Q16",
    "Q17",
    "Q18",
    "Q19",
    "Q20",
    "Q21",
    "Q22",
    "Q23",
    "Q24",
    "Q25",
    "Q26",
    "Q27",
    "Q28",
  ];
  const [value, setValue] = useState("");

  const numRows = Math.ceil(questions.length / 4);
  //#endregion

  //#region max mark:
  const markLimits = {
    Q1: { min: 0, max: 1 },
    Q2: { min: 0, max: 1 },
    Q3: { min: 0, max: 1 },
    Q4: { min: 0, max: 1 },
    Q5: { min: 0, max: 1 },
    Q6: { min: 0, max: 1 },
    Q7: { min: 0, max: 1 },
    Q8: { min: 0, max: 1 },
    Q9: { min: 0, max: 1 },
    Q10: { min: 0, max: 1 },
    Q11: { min: 0, max: 1 },
    Q12: { min: 0, max: 1 },
    Q13: { min: 0, max: 1 },
    Q14: { min: 0, max: 1 },
    Q15: { min: 0, max: 1 },
    Q16: { min: 0, max: 2 },
    Q17: { min: 0, max: 2 },
    Q18: { min: 0, max: 2 },
    Q19: { min: 0, max: 2 },
    Q20: { min: 0, max: 2 },
    Q21: { min: 0, max: 4 },
    Q22: { min: 0, max: 4 },
    Q23: { min: 0, max: 4 },
    Q24: { min: 0, max: 4 },
    Q25: { min: 0, max: 4 },
    Q26: { min: 0, max: 10 },
    Q27: { min: 0, max: 10 },
    Q28: { min: 0, max: 10 },
  };

  //#endregion

  //#region  Create an array of arrays
  const questionRows = [];
  for (let i = 0; i < numRows; i++) {
    questionRows.push(questions.slice(i * 4, (i + 1) * 4));
  }
  //#endregion

  //#region  markChange
  // const handleMarkChange = (question, value) => {
  //   if (value === "") {
  //     setMarks((prevMarks) => ({
  //       ...prevMarks,
  //       [question]: value,
  //     }));
  //   } else {
  //     const numericValue = value;
  //     const markLimitsForQuestion = markLimits[question];

  //     // Check if the input is a valid number within the allowed range
  //     if (
  //       numericValue >= markLimitsForQuestion.min &&
  //       numericValue <= markLimitsForQuestion.max
  //     ) {
  //       setMarks((prevMarks) => ({
  //         ...prevMarks,
  //         [question]: numericValue,
  //       }));
  //     } else if (numericValue === 0) {
  //       setMarks((prevMarks) => ({
  //         ...prevMarks,
  //         [question]: numericValue,
  //       }));
  //     }
  //   }
  // };
  //#endregion

  //#region  markChange
  const handleMarkChange = (question, value) => {
    if (value === "") {
      setMarks((prevMarks) => ({
        ...prevMarks,
        [question]: value,
      }));
    } else {
      const numericValue = value // Convert the input value to a number
      const markLimitsForQuestion = markLimits[question];

      if (
        numericValue >= markLimitsForQuestion.min &&
        numericValue <= markLimitsForQuestion.max
      ) {
        setMarks((prevMarks) => ({
          ...prevMarks,
          [question]: numericValue,
        }));
        // } else if (numericValue === 0) {
        //   setMarks((prevMarks) => ({
        //     ...prevMarks,
        //     [question]: numericValue,
        //   }));
      } else {
        // Show a toast message for invalid input
        toast.error(
          "Please enter a mark between " +
          markLimitsForQuestion.min +
          " and " +
          markLimitsForQuestion.max,
          { duration: 1500 }
        );

        // Highlight the input box dynamically using Tailwind CSS classes
        const inputElement = document.getElementById(question);
        if (inputElement) {
          inputElement.classList.add(
            "border-2",
            "border-red-500",
          );
          setTimeout(() => {
            inputElement.classList.remove("border-red-500");
          }, 1500); // Remove the highlight after 3 seconds
        }
      }
    }
  };
  //#endregion

  //#region  clearMarks
  const handleClear = () => {
    const clearedMarks = {};
    for (const question of questions) {
      clearedMarks[question] = "";
    }
    setMarks(clearedMarks);
  };
  //#endregion

  //#region  HandleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    const addData = async () => {
      setIsLoading(true);

      const marksAsNumbers = {};
      for (const question of questions) {
        marksAsNumbers[question] = parseInt(marks[question] || 0, 10);
      }

      const newData = {
        code: courseCode,
        reg: regNo,
        class: classSection,
        section: section,
        exam: examType,
        ...marksAsNumbers,
      };

      try {
        await axios
          .post("http://localhost:3005/user/result", newData)
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              setIsLoading(false);
              alert("success");
            } else {
              setIsLoading(false);
            }
          });
      } catch (err) {
        setIsLoading(false);
      }
    };

    addData();
  };
  //#endregion

  //#region  handleSumbitAssignment
  const handleSumbitAssignment = (e) => {
    e.preventDefault();

    const addData = async () => {
      setIsLoading(true);

      // const newData = new FormData();
      // newData.append('reg', regNo);
      // newData.append('exam', 'ASG');
      // newData.append('code', courseCode)
      // newData.append(examType === 'CIA 1' ? 'Q1' : 'Q2', value);

      const AssignType = examType === 'CIA 1' ? 'Q1' : 'Q2'

      const newData = {
        reg: regNo,
        code: courseCode,
        exam: 'ASG',
        [AssignType]: parseInt(value),
      };

      try {
        await axios
          .post("http://localhost:3005/user//cia", newData)
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              setIsLoading(false);
              alert("success");
            } else {
              setIsLoading(false);
            }
          });
      } catch (err) {
        setIsLoading(false);
      }
    };

    addData();
  };
  //#endregion


  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || (inputValue >= 0 && inputValue <= 3)) {
      setValue(inputValue);
    } else {
      toast.error("Please enter a number between 0 and 3.", { duration: 1500 });
    }
  };

  return (
    <div className=" w-screen h-screen flex flex-row space-x-4  justify-center items-start p-10 bg-gradient-to-r from-blue-500 to-green-500">
      <div className=" w-fit space-y-4">

        <div className="flex flex-col justify-center items-center shadow-md bg-white rounded-lg ">
          <div className=" w-full flex justify-between items-end px-5 pb-5">

            <select
              value={markType}
              onChange={(e) => setMarkType(e.target.value)}

              className={`shadow-sm border dark:shadow-none dark:border-none dark:bg-[#2F383D] h-10 w-[10rem] rounded px-2   placeholder-[#414956] dark:placeholder-[#768795] text-black dark:text-white`}
            >
              <option value="que">Question Mark</option>
              <option value="ass">Assignment Mark</option>
              <option value="pos">Course POS</option>
            </select>

            <div>
              <div className="flex mb-2 space-x-1">
                <h1 className="text-base font-normal text-[#676060]">
                  Exam Type:
                </h1>
              </div>

              <div className="flex space-x-4">
                <label className={`transition-all duration-300 ${examType === 'CIA 1' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}>
                  <input
                    type="radio"
                    value={"CIA 1"}
                    checked={examType === "CIA 1"}
                    onChange={(e) => setExamType(e.target.value)}
                    className="sr-only" // Hide the actual radio button
                  />
                  {markType === 'que' ? 'CIA 1' : 'Ass 1 '}
                </label>
                <label className={`transition-all duration-300 ${examType === 'CIA 2' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}>
                  <input
                    type="radio"
                    value={"CIA 2"}
                    checked={examType === "CIA 2"}
                    onChange={(e) => setExamType(e.target.value)}
                    className="sr-only"
                  />
                  {markType === 'que' ? 'CIA 2' : 'Ass 2'}
                </label>
                {markType == 'que' && (
                  <label className={`transition-all duration-300 opacity-0 ${markType === 'que' ? 'opacity-100' : ''} ${examType === 'ESE' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}>
                    <input
                      type="radio"
                      value={"ESE"}
                      checked={examType === "ESE"}
                      onChange={(e) => setExamType(e.target.value)}
                      className="sr-only"
                    />
                    ESE
                  </label>
                )}
              </div>
            </div>


          </div>

          <div className=" w-full grid gap-4 grid-cols-2 p-6 rounded-md border-1 border-black">
            <TextField
              text={"Course Code "}
              name={"Enter the Course Code"}
              value={courseCode}
              handleChange={setCourseCode}
            />
            <TextField
              text={"Class "}
              name={"Enter the Class"}
              value={classSection}
              handleChange={setClassSection}
            />
            <TextField
              text={"Section "}
              name={"Enter the Section"}
              value={section}
              handleChange={setSection}
            />
            <TextField
              text={"Reg No "}
              name={"Enter the Reg"}
              value={regNo}
              handleChange={setRegNo}
            />

            {/* <div className=" flex justify-center items-center bg-white">
            <label className='relative cursor-pointer'>
              <input type="text" placeholder="Input" className='bg-[#F8FCFF] shadow-sm border   h-10 w-[15rem] xl:w-[16.75rem] rounded px-2  placeholder-gray-400   text-black  placeholder-opacity-0 transition duration-200' />
              <span className='text-md text-gray-400 text-opacity-80 bg-transparent absolute left-2 top-2 px-1 transition duration-200 input-text'>Input</span>
            </label>
          </div> */}
          </div>



          {markType == 'ass' &&
            <div className=" w-full flex justify-between items-end px-5 pb-5">

              <div className="flex flex-col space-y-2">
                <h1 className="text-base font-normal text-[#676060]">Assignment Mark :</h1>
                <input
                  type="number"
                  className="w-[10rem] h-10 pl-2 text-center bg-[#F8FCFF] shadow-md border rounded-md"
                  value={value}
                  placeholder="0"
                  onChange={handleInputChange}
                  min="0"
                  max="3"
                />
              </div>

              <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-[5.67rem] flex justify-center items-center" onClick={handleSumbitAssignment}>
                Next
              </button>
            </div>
          }

        </div>

        {markType == 'que' && <div className="w-fit bg-white rounded-lg p-3 shadow-md">
          <table className="border-collapse border">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {questionRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((question, columnIndex) => (
                    <React.Fragment key={question}>
                      <td className="border p-2 text-center">
                        {question}
                      </td>
                      <td className="border p-2">
                        <input
                          id={question}
                          type="number"
                          value={marks[question] || ""}
                          onChange={(e) =>
                            handleMarkChange(question, e.target.value)
                          }
                          className={`w-[4rem] pl-2 text-center border transition duration-300 ease-in-out focus:outline-none ${marks[question] &&
                            (parseInt(marks[question], 10) >
                              markLimits[question].max ||
                              parseInt(marks[question], 10) <
                              markLimits[question].min)
                            ? "border-red-500 border-4"
                            : ""
                            }`}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        }

        {markType == 'pos' && <div className="w-fit bg-white rounded-lg p-3 shadow-md">
          <table className="border-collapse border">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {questionRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((question, columnIndex) => (
                    <React.Fragment key={question}>
                      <td className="border p-2 text-center">
                        {question}
                      </td>
                      <td className="border p-2">
                        <input
                          id={question}
                          type="number"
                          value={marks[question] || ""}
                          onChange={(e) =>
                            handleMarkChange(question, e.target.value)
                          }
                          className={`w-[4rem] pl-2 text-center border transition duration-300 ease-in-out focus:outline-none ${marks[question] &&
                            (parseInt(marks[question], 10) >
                              markLimits[question].max ||
                              parseInt(marks[question], 10) <
                              markLimits[question].min)
                            ? "border-red-500 border-4"
                            : ""
                            }`}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        }

        {markType == 'que' &&
          <div className=" flex justify-end w-[43rem] ">
            <button
              onClick={handleClear}
              className=" bg-slate-400 hover:bg-red-700 text-white p-2 rounded w-[5.67rem] flex justify-center items-center mr-4"
            >
              Clear All
            </button>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-[5.67rem] flex justify-center items-center"
            >
              {isLoading ? (
                <img
                  src={loading}
                  alt=""
                  className=" w-8 h-8 animate-spin text-white"
                />
              ) : (
                "Next"
              )}
            </button>
          </div>
        }

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-[5.67rem] flex justify-center items-center"
        >
          {isLoading ? (
            <img
              src={loading}
              alt=""
              className=" w-8 h-8 animate-spin text-white"
            />
          ) : (
            "get Result"
          )}
        </button>



      </div>

    </div>
  );
};

export default addMarks;
