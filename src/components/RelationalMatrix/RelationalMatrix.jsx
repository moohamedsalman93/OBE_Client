import React, { useEffect, useState } from 'react'
import { getApi } from '../../api/api';
import loadingImg from '../../assets/loading.svg'
import toast from 'react-hot-toast';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

function RelationalMatrix({ userId,year,currentSem }) {

  const [indexOfAdd, setIndexOfAdd] = useState(-1)
  const [isHideDiv, setIsHideDiv] = useState(false)
  // const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)
  const [Course, setCourse] = useState([]);
  const [marks, setMarks] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    "PSO1CO1",
    "PSO1CO2",
    "PSO1CO3",
    "PSO1CO4",
    "PSO1CO5",

    "PSO2CO1",
    "PSO2CO2",
    "PSO2CO3",
    "PSO2CO4",
    "PSO2CO5",

    "PSO3CO1",
    "PSO3CO2",
    "PSO3CO3",
    "PSO3CO4",
    "PSO3CO5",

    "PSO4CO1",
    "PSO4CO2",
    "PSO4CO3",
    "PSO4CO4",
    "PSO4CO5",

    "PSO5CO1",
    "PSO5CO2",
    "PSO5CO3",
    "PSO5CO4",
    "PSO5CO5",
  ];

  const markLimits = {
    PSO1CO1: { min: 0, max: 3 },
    PSO1CO2: { min: 0, max: 3 },
    PSO1CO3: { min: 0, max: 3 },
    PSO1CO4: { min: 0, max: 3 },
    PSO1CO5: { min: 0, max: 3 },
    PSO2CO1: { min: 0, max: 3 },
    PSO2CO2: { min: 0, max: 3 },
    PSO2CO3: { min: 0, max: 3 },
    PSO2CO4: { min: 0, max: 3 },
    PSO2CO5: { min: 0, max: 3 },
    PSO3CO1: { min: 0, max: 3 },
    PSO3CO2: { min: 0, max: 3 },
    PSO3CO3: { min: 0, max: 3 },
    PSO3CO4: { min: 0, max: 3 },
    PSO3CO5: { min: 0, max: 3 },
    PSO4CO1: { min: 0, max: 3 },
    PSO4CO2: { min: 0, max: 3 },
    PSO4CO3: { min: 0, max: 3 },
    PSO4CO4: { min: 0, max: 3 },
    PSO4CO5: { min: 0, max: 3 },
    PSO5CO1: { min: 0, max: 3 },
    PSO5CO2: { min: 0, max: 3 },
    PSO5CO3: { min: 0, max: 3 },
    PSO5CO4: { min: 0, max: 3 },
    PSO5CO5: { min: 0, max: 3 },
  };

  const numRows = Math.ceil(questions.length / 5);
  const questionRows = [];
  for (let i = 0; i < numRows; i++) {
    questionRows.push(questions.slice(i * 5, (i + 1) * 5));
  }

  useEffect(() => {
    getApi(`staff/getStaffsDetails?uname=${userId}&sem=${currentSem}&year=`+year, setCourse, setLoading2)
  }, [])

  const handleMarkChange = (question, value) => {
    if (value === "") {
      setMarks((prevMarks) => ({
        ...prevMarks,
        [question]: value,
      }));
    } else {
      const numericValue = value;
      const markLimitsForQuestion = markLimits[question];

      if (
        numericValue >= markLimitsForQuestion.min &&
        numericValue <= markLimitsForQuestion.max
      ) {
        setMarks((prevMarks) => ({
          ...prevMarks,
          [question]: numericValue,
        }));
      }
      else {
        toast.error(
          "Please enter a mark between " +
          markLimitsForQuestion.min +
          " and " +
          markLimitsForQuestion.max,
          { duration: 1500 }
        );
      }
    }
  };

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
        code: Course[indexOfAdd]?.code?.code,
        year:year,
        ...marksAsNumbers,
      };

      try {
        await axios
          .post(api + "staff/addPso", newData)
          .then((res) => {
            if (res?.status === 200) {
              setIsLoading(false);
              toast.success(`PSO saved successfully ${Course[indexOfAdd]?.code?.code}`, { duration: 1500 });
              getApi(`staff/getStaffsDetails?uname=${userId}&sem=${currentSem}&year=`+year, setCourse, setLoading2).then((res) => {
                setIndexOfAdd(-1)
                setMarks({})
              })

            }
          });
      } catch (err) {
        toast.error("validation error", { duration: 1500 });
        setIsLoading(false);
      }
    };

    addData();
  };
  //#endregion

  const handleEdit = (index) => {
    setIndexOfAdd(index)
    const marksAsNumbers = {};
    for (const question of questions) {
      marksAsNumbers[question] = Course[index].code.pso[0][question];
    }
    setMarks(marksAsNumbers)
  }

  const handleCancel = () => {
    setIndexOfAdd(-1)
    setMarks({})
  }





  return (
    <div className=' w-full h-full flex flex-col p-5 bg-white'>
      <div className=' w-full  grow py-10'>
        <p className=' text-2xl font-semibold  text-black'>Relationship Matrix</p>
        {isLoading2 ?
          <div className=' w-full flex justify-center items-center'> <img src={loadingImg} alt="" className=' h-8' /></div> :
          (
            <div className=' w-full pt-5'>

              <div className=' w-full'>

                < p className=' font-semibold'>Not Entered</p>
                <div className=' w-full py-3 gap-3 flex flex-wrap'>
                  {
                    Course.map((item, index) => item.code.pso.length === 0 && (
                      <div key={index} onClick={() => setIndexOfAdd(index)} className=' h-[7rem] shadow-md bg-[#e13434] cursor-pointer bg-opacity-10 saturate-200 after:translate-x-3 before:translate-x-8 duration-300 rounded-lg w-[14rem] border flex flex-col justify-start items-center p-2 space-y-1'>
                        <p className=' text-sm font-medium'>{item.code.department.departmentCode}</p>
                        <p className=' text-md font-medium'>{item.code.code}</p>
                        <p className=' text-sm font-medium  w-full flex items-center justify-center text-center'>{item.code.name}</p>
                      </div>))
                  }

                </div>

              </div>

              <div className=' w-full'>
                <p className=' font-semibold'>Entered</p>
                <div className=' w-full py-3 gap-3 flex flex-wrap'>
                  {
                    Course.map((item, index) => item.code.pso.length !== 0 && (
                      <div key={index} onClick={() => handleEdit(index)} className=' h-[7rem] shadow-md bg-[#34e168] bg-opacity-10 saturate-200 after:translate-x-3 before:translate-x-8 duration-300 rounded-lg w-[14rem] border flex flex-col justify-start items-center p-2 space-y-1'>
                        <p className=' text-md font-medium'>{item.code.code}</p>
                        <p className=' text-sm font-medium'>{item.code.department.departmentCode}</p>
                        <p className=' text-sm font-medium h-full w-full flex items-center justify-center text-center'>{item.code.name}</p>
                      </div>))
                  }

                </div>

              </div>
            </div>
          )

        }

      </div>

      {
        indexOfAdd !== -1 &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[42%] h-[53%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <p className=' font-semibold text-lg'>Add PSO for {Course[indexOfAdd].code.name}</p>


            <div className=' grow w-full flex justify-center'>
              <table className="border-collapse mt-5 border-2 h-fit">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    <th></th>
                    <th className="border p-2">PS1</th>
                    <th className="border p-2">PS2</th>
                    <th className="border p-2">PS3</th>
                    <th className="border p-2">PS4</th>
                    <th className="border p-2">PS5</th>
                  </tr>
                </thead>
                <tbody>
                  {questionRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className='p-2 font-semibold'>CO{rowIndex + 1}</td>
                      {row.map((question, columnIndex) => (
                        <React.Fragment key={question}>
                          <td className="border p-2">
                            <input
                              id={question}
                              type="number"
                              value={marks[question]}
                              onChange={(e) =>
                                handleMarkChange(question, e.target.value)
                              }
                              className={`w-[5rem] pl-2 text-center border transition duration-300 ease-in-out focus:outline-none `}
                            />
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={handleCancel}>Cancel</button>
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={handleSubmit}>Add</button>
            </div>

          </div>
        </div>
      }


    </div >
  )
}

export default RelationalMatrix
