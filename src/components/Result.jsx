import React, { useState } from 'react';
import loading from '../assets/loading.svg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const questions = [
  'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'
];

const ResultPage = () => {
  const { regNo } = useParams();
  const [marks, setMarks] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleMarkChange = (question, value) => {
    if (value === '') {
      setMarks((prevMarks) => ({
        ...prevMarks,
        [question]: value,
      }));
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
        setMarks((prevMarks) => ({
          ...prevMarks,
          [question]: numericValue,
        }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const marksAsNumbers = {};
    for (const question of questions) {
      marksAsNumbers[question] = parseInt(marks[question] || 0, 10);
    }

    const dataToSend = {
      reg: regNo,
      ...marksAsNumbers
    };

   const addData = async () => {
      setIsLoading(true);

      try {
         await axios.post('http://localhost:3000/user/result', dataToSend).then(res => {
          console.log(res)
          if(res.status === 201){
            setIsLoading(false);
            alert('Successfully Saved');
            navigate(`/`);
          }
          else{
            setIsLoading(false);
          }
          
         })
        
      } catch (err) {
        setIsLoading(false);
      }
    };

    addData();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-10">
      <div className=' w-[50rem] '>
        <table className="border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Reg No</th>
              {questions.map((question) => (
                <th key={question} className="border p-2">{question}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{regNo}</td>
              {questions.map((question) => (
                <td key={question} className="border p-2">
                  <input
                    type="number"
                    value={marks[question] || ''}
                    onChange={(e) => handleMarkChange(question, e.target.value)}
                    className=' w-[4rem]'
                    
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-[8.67rem] flex justify-center items-center">
        {isLoading ? <img src={loading} alt="" className=' w-8 h-8 animate-spin text-white' /> : 'Save'}
      </button>
    </div>
  );
};

export default ResultPage;
