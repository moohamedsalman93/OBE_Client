import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loading from "../assets/loading.svg";
import { ReactComponent as BackArrow} from "../assets/ionicons/arrow-back-outline.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { getApi, searchData } from "../api/api";
import { debounce } from 'lodash';


const AddMarks = () => {
  //#region  Variables
  const dropdownRef2 = useRef(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const [isOpen2, setIsOpen2] = useState(false);
  const [CourseData, setCourseData] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  const [courseCode, setCourseCode] = useState("");
  const [deparment, setdepartment] = useState("");
  const [regNo, setRegNo] = useState("");
  const [section, setSection] = useState("");
  const [examType, setExamType] = useState("C1");
  const [staffIntial, setStaffIntial] = useState('');
  const [studentStatus, setStudentStatus] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [markType, setMarkType] = useState("que");
  const [marks, setMarks] = useState({});

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
      const numericValue = value; // Convert the input value to a number
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
          inputElement.classList.add("border-2", "border-red-500");
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
        marksAsNumbers[examType + question] = parseInt(marks[question] || 0, 10);
      }

      const statusStudent = studentStatus == '' ? 'present' : studentStatus

      const newData = {

        regNo: regNo,
        department: deparment,
        code: courseCode,
        claass: deparment,
        section: section,
        status: statusStudent,
        exam: examType,
        ...marksAsNumbers,
      };

      try {
        await axios
          .post("http://localhost:3000/staff/addMarks", newData)
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

      const AssignType = examType === "CIA 1" ? "Q1" : "Q2";

      const newData = {
        reg: regNo,
        code: courseCode,
        exam: "ASG",
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

  //#region Handle Input Change
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || (inputValue >= 0 && inputValue <= 3)) {
      setValue(inputValue);
    } else {
      toast.error("Please enter a number between 0 and 3.", { duration: 1500 });
    }
  };
  //#endregion


  //#region Handle Outside Click
  const handleOutsideClick2 = event => {
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      setIsOpen2(false);
    }
  };
  //#endregion

  //#region useEffect
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick2);
    return () => {
      document.removeEventListener('click', handleOutsideClick2);
    };
  }, []);
  //#endregion

  //#region useEffect
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Arrow down
      if (event.keyCode === 40) {
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) => Math.min(prevIndex + 1, searchValue.length - 1));
      }
      // Arrow up
      else if (event.keyCode === 38) {
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
      // Enter
      else if (event.keyCode === 13) {
        event.preventDefault();
        if (searchValue[focusedOptionIndex]) {
          departmentOnSelect(searchValue[focusedOptionIndex]);
        }
      }
    };

    if (isOpen2) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen2, searchValue, focusedOptionIndex]);
  //#endregion

  //#region departmentOnSelect
  const departmentOnSelect = item => {
    setdepartment(item.departmentCode);
    setIsOpen2(false);
    getApi(`staff/searchCode?question=${item.departmentCode}`, setCourseData, setIsLoading2)
    console.log(courseCode)
  };
  //#endregion

  //#region search
  const handleDepSearch = debounce(async (val) => {
    console.log('searching..')
    searchData('staff/searchDepartment/?question=' + val, setSearchValue, setIsLoading2)
  }, 500);
  //#endregion

  //#region drop
  const handleDropdownToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  //#endregion

  //#region departmentOnChange
  const departmentOnChange = event => {
    setdepartment(event.target.value);
    handleDepSearch(event.target.value);
  };
  //#endregion

  //#region useffect total
  useEffect(() => {
    // Calculate the sum of all marks
    const sum = Object.values(marks).reduce((acc, curr) => acc + parseInt(curr || 0), 0);
    setTotalMarks(sum);
  }, [marks]);
  //#endregion

  return (
    <div className=" w-screen h-screen flex flex-row justify-between items-start px-10 bg-gradient-to-r from-blue-500 to-green-500">

      <BackArrow className="w-6 h-6 text-white"/>

      <div className="flex flex-col  space-y-4 bg-white p-2 rounded-lg">

        <div className="flex flex-col justify-center  items-center border-b w-[43rem]  ">

          <div className=" w-full flex justify-between items-end px-5">

            <div className=" w-full">

              <div className="flex items-end justify-between w-full h-fit ">

                <div className=" space-y-2">
                  <h1 className="text-base font-normal text-[#676060]">
                    OB components :
                  </h1>
                  <div className=" flex space-x-4 items-end ">
                    <label
                      className={`transition-all duration-300 ${examType === "C1"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                        } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}
                    >
                      <input
                        type="radio"
                        value={"C1"}
                        checked={examType === "C1"}
                        onChange={(e) => setExamType(e.target.value)}
                        className="sr-only" // Hide the actual radio button
                      />
                      {markType === "que" ? "CIA 1" : "Ass 1 "}
                    </label>

                    <label
                      className={`transition-all duration-300 ${examType === "C2"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                        } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}
                    >
                      <input
                        type="radio"
                        value={"CIA 2"}
                        checked={examType === "C2"}
                        onChange={(e) => setExamType(e.target.value)}
                        className="sr-only"
                      />
                      CIA 2
                    </label>

                    <label
                      className={`transition-all duration-300 opacity-100 ${examType === "ESE"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                        } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}
                    >
                      <input
                        type="radio"
                        value={"ESE"}
                        checked={examType === "ESE"}
                        onChange={(e) => setExamType(e.target.value)}
                        className="sr-only"
                      />
                      ESE
                    </label>

                    <label
                      className={`transition-all duration-300  opacity-100 ${examType === "ASS 1"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                        } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}
                    >
                      <input
                        type="radio"
                        value={"ASS 1"}
                        checked={examType === "ASS 1"}
                        onChange={(e) => setExamType(e.target.value)}
                        className="sr-only"
                      />
                      ASS 1
                    </label>

                    <label
                      className={`transition-all duration-300 opacity-100 ${examType === "ASS 2"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                        } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer`}
                    >
                      <input
                        type="radio"
                        value={"ASS 2"}
                        checked={examType === "ASS 2"}
                        onChange={(e) => setExamType(e.target.value)}
                        className="sr-only"
                      />
                      ASS 2
                    </label>
                  </div>
                </div>

                <div className=" space-x-2 items-center flex">
                  <h1 className="text-[#676060]">Staff's Initial :</h1>

                  <input
                    type="text"
                    placeholder="Name Or Intial"
                    value={staffIntial}
                    onChange={(event) => setStaffIntial(event.target.value)}
                    maxLength={3}
                    required
                    className="bg-[#F8FCFF] shadow-sm border   h-10 w-[10rem] xl:w-[10rem] rounded px-2  placeholder-gray-400 placeholder:text-gray-400   text-black  placeholder-opacity-0 transition duration-200"
                  />

                </div>

              </div>

            </div>

          </div>

          <div className=" w-full grid gap-3 xl:grid-cols-3 2xl:grid-cols-4 p-6 rounded-md border-1 border-black">

            <div className='w-[9rem] space-y-2 xl:w-[9rem] ' ref={dropdownRef2}>
              <h1 className="text-[#676060]">Department :</h1>
              <input
                type="text"
                value={deparment}
                // onBlur={() => !optionSelected && setdepartment('')} // Modify this line
                onChange={departmentOnChange}
                onFocus={handleDropdownToggle2}
                placeholder="Eg: MCA"
                className='bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[9rem] rounded px-2 text-black'
              />
              {isOpen2 && (
                <ul className="absolute z-20 mt-2 w-[9rem] xl:w-[9rem] flex flex-col items-center min-h-min max-h-[20rem] overflow-y-hidden  bg-white border border-gray-300 rounded-md shadow-md">
                  {isLoading2 ? (<img src={loading} alt="" className=" w-8 h-8 animate-spin text-black" />) :
                    (searchValue.length === 0 ? (
                      <li className="py-1 px-4 text-gray-400">{deparment.length === 0 ? "Type..." : "No Department found"}</li>
                    ) : (
                      searchValue.map((item, index) => (
                        <li
                          key={item.id}
                          onClick={() => departmentOnSelect(item)}
                          className={`py-1 px-4 cursor-pointer ${index === focusedOptionIndex ? 'bg-blue-200 w-full' : ''}`}
                        >
                          {item.departmentCode}
                        </li>
                      ))
                    ))
                  }
                </ul>
              )}
            </div>


            <div className=" space-y-2">
              <h1 className="text-[#676060]">Course Code :</h1>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className={`bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[9rem] relative rounded px-2 ${courseCode == '' ? 'text-gray-400' : 'text-black'}`}
              >
                <option value=''>
                  Select Code
                </option>

                {CourseData.map((course) => (
                  <option key={course.id} value={course.code}>
                    {course.code}
                  </option>
                ))}
                {/* Add your dropdown options here */}
              </select>
            </div>

            <div className=" space-y-2">
              <h1 className="text-[#676060]">Register No:</h1>
              <div className=" flex relative items-center">
                <h1 className=" absolute left-1 font-medium">21{deparment != '' ? deparment : 'MCA'}</h1>
                <input
                  type="text"
                  placeholder="XXX"
                  value={regNo}
                  onChange={(event) => setRegNo(event.target.value)}
                  maxLength={3}
                  required
                  className="bg-[#F8FCFF] shadow-sm border pl-[3.5rem]   h-10 w-[9rem] xl:w-[9rem] rounded px-2  placeholder-gray-400 placeholder:text-gray-400   text-black  placeholder-opacity-0 transition duration-200"
                />

              </div>

            </div>

            <div className=" space-y-2">
              <h1 className="text-[#676060]">Section :</h1>

              <input
                type="text"
                placeholder="Eg: A"
                value={section}
                onChange={(event) => setSection(event.target.value)}
                maxLength={1}
                required
                className="bg-[#F8FCFF] shadow-sm border   h-10 w-[9rem] xl:w-[9rem] rounded px-2  placeholder-gray-400 placeholder:text-gray-400   text-black  placeholder-opacity-0 transition duration-200"
              />

            </div>

            <div className="xl:col-span-2 2xl:col-span-3 h-full w-full  flex justify-end items-center">

              <div className=" bg-slate-200 py-2 space-x-2 flex items-center shadow-md border justify-center rounded-md  px-3 w-fit">

                <h1 className="">Student Status :</h1>

                <button
                  className={`bg-[#F8FCFF] shadow-sm border h-10 w-fit rounded-md px-2 ${studentStatus === 'absent' ? 'bg-blue-500 text-white' : 'text-black'}`}
                  onClick={() => {
                    if (studentStatus == 'absent') {
                      setStudentStatus('');
                    }
                    else {
                      setStudentStatus('absent');
                    }
                  }}
                >
                  Absent
                </button>

                <button
                  className={`bg-[#F8FCFF] shadow-sm border h-10 w-[6.5rem] rounded-md  px-2 ${studentStatus === 'notOnrole' ? 'bg-blue-500 text-white' : 'text-black'}`}
                  onClick={() => {
                    if (studentStatus == 'notOnrole') {
                      setStudentStatus('');
                    }
                    else {
                      setStudentStatus('notOnrole');
                    }
                  }}
                >
                  Not on Roll
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="w-[43rem]  p-3 border-b ">
          {examType === 'ASS 1' || examType === 'ASS 2' ?
            (<div className="flex items-center space-x-2 ">
              <h1 className="text-[#676060]">Assignment :</h1>

              <input
                type="text"
                placeholder="0"
                value={staffIntial}
                onChange={(event) => setStaffIntial(event.target.value)}
                maxLength={1}
                required
                className="bg-[#F8FCFF] shadow-sm border   h-10 w-[10rem] xl:w-[10rem] rounded px-2  placeholder-gray-400 placeholder:text-gray-400   text-black  placeholder-opacity-0 transition duration-200"
              />
            </div>) :
            (<table className="border-collapse border">
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
                        <td className="border p-2 text-center">{question}</td>
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
            </table>)
          }
        </div>

        <div className=" flex justify-between items-center w-[43rem] ">

          <div>
            Total Marks: {totalMarks}
          </div>

          <div className=" flex space-x-2">
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
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddMarks;
