import React, { useEffect, useRef, useState } from 'react'
import { putApi2 } from '../../../api/api';
import { debounce } from 'lodash';
import loading from "../../../assets/loading.svg";
import studentMarksImg from "../../../assets/studentMark.png";
import ReactToPrint from 'react-to-print';

function Students({ year, currentSem }) {
    const [regNo, setRegNo] = useState("");
    const [isLoading1, setIsLoading1] = useState(false)
    const [outComeData, setOutcomeData] = useState([]);
    const comp = useRef()


    //#region handleGet
    const handleGet = () => {
        putApi2(`staff/getStudent`, setOutcomeData, { RegNO: regNo, year: year, sem: currentSem }, setIsLoading1)
    }
    //#endregion





    const handlePrint = () => {

        setTimeout(() => {
            const printableComponent = document.createElement('div');
            printableComponent.innerHTML = document.querySelector('.print-only').innerHTML;

            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(`
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Print Preview</title>
                  <link rel="stylesheet" href="./MyComponent.css" type="text/css">
                  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body>
                  ${printableComponent.outerHTML}
                </body>
              </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }, 1000);
    };


    return (
        <div className=' w-full xl:h-[45rem] 2xl:h-[39rem] p-5 flex flex-col bg-white rounded-lg shadow-md'>
            <div className=" flex justify-start items-center space-x-5">


                <span className="flex items-center space-x-2 font-normal">
                    <h1>Register No :</h1>
                    <input type="text" placeholder='23MCAXXX' value={regNo} onChange={(e) => setRegNo((e.target.value)?.toUpperCase())} className='border-2 p-2 rounded-md h-10' />
                </span>

                <button className=" bg-[#4f72cc] h-10 px-4 rounded-md text-white" onClick={() => handleGet()}>
                    Get
                </button>
                <div className=' grow  h-12 flex justify-end items-center'>
                    <button disabled={outComeData.length === 0} onClick={() => handlePrint()} className=' w-fit flex font-medium px-3 py-1 bg-black text-white cursor-pointer rounded-md'>
                        Print
                    </button>

                </div>
            </div>

            {outComeData.length !== 0 ?
                (<div className=' w-full grow'>

                    <div className="flex w-full flex-col justify-start  items-center grow py-4">


                        <table className="table-auto rounded-md border mt-2">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="px-4 py-2 border">Courses code</th>
                                    <th className="px-4 py-2 border">Courses Name</th>
                                    <th className="px-4 py-2 border">Attainment level</th>

                                </tr>
                            </thead>
                            <tbody>
                                {outComeData.map((item, index) =>
                                    <tr key={index} className=' font-medium'>
                                        <th className="border px-4 py-2 ">{item?.courseCode}</th>
                                        <td className="border px-4 py-2 w-72 h-16 overflow-x-hidden text-start">{item?.name}</td>
                                        <td className="border px-4 py-2">{item?.Attain}</td>
                                    </tr>
                                )

                                }
                            </tbody>
                        </table>

                    </div>

                    <div class="print-only" style={{ display: "none" }}>
                        <div style={{ width: '100%', padding: '1px', paddingLeft: '4px', paddingRight: '10px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'between', fontSize: '20px' }}>
                            <div style={{ height: '50%%', margin: 'auto', borderCollapse: 'collapse', textAlign: 'center', marginBottom: '50px' }}>
                                <p style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse', textAlign: 'center', fontWeight: 'bold' }}>{'Jamal Mohamed College (Autonomous)'}</p>
                                <p style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse', textAlign: 'center' }}>{`Accredited with 'A++' Grade by NAAC (4th cycle) with CGPA 3.69 out of 4.0`}</p>
                                <p style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse', textAlign: 'center' }}>{`Affiliated to Bharathidasan University`}</p>
                                <p style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse', textAlign: 'center' }}>Student Outcome for {regNo}</p>

                            </div>

                            <table style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
                                <thead style={{ background: 'white', borderRadius: '0.5rem', border: '1px solid #ccc' }}>
                                    <tr style={{ height: '3rem', fontWeight: 'bold' }}>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Courses code</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Courses Name</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Attainment level</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: 'white' }}>
                                    {outComeData.map((item, index) =>
                                        <tr key={index} style={{ height: '55px', border: '2px solid #ccc' }}>
                                            <th style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{item?.courseCode}</th>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'start', border: '2px solid #ccc' }}>{item?.name}</td>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{item?.Attain}</td>

                                        </tr>
                                    )

                                    }
                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>)
                :
                (
                    <div className=' mt-5'>
                        <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                            <div className="w-fit h-fit relative">
                                <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                <div className=" absolute bottom-[9rem] text-center">
                                    <p>Enter Department and Course code to get</p>
                                    <p>Course OutCome</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Students
