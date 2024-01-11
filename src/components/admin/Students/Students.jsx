import React, { useEffect, useRef, useState } from 'react'
import { putApi2 } from '../../../api/api';
import { debounce } from 'lodash';
import loading from "../../../assets/loading.svg";
import studentMarksImg from "../../../assets/studentMark.png";
import ReactToPrint from 'react-to-print';

function Students({year}) {
    const [regNo, setRegNo] = useState("");
    const [isLoading1, setIsLoading1] = useState(false)
    const [outComeData, setOutcomeData] = useState([]);
    const comp = useRef()


    //#region handleGet
    const handleGet = () => {
        putApi2(`staff/getStudent`, setOutcomeData, { RegNO: regNo, year: year }, setIsLoading1).then(res => {

        })
    }
    //#endregion


    function calculateCiaTotal(marks) {
        let LOT = (marks.C1LOT + marks.C2LOT + marks.ASGCO1 + marks.ASGCO2 + marks.C1MOT + marks.C2MOT + marks.C1HOT + marks.C2HOT)
        return Math.round(LOT)
    }

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
        <div className=' w-full h-full p-5 flex flex-col'>
            <div className=" flex justify-start items-center space-x-5">


                <span className="flex items-center space-x-2">
                    <h1>Register No :</h1>
                    <input type="text" placeholder='23MCAXXX' value={regNo} onChange={(e) => setRegNo((e.target.value)?.toUpperCase())} className='border-2 p-2 rounded-md' />
                </span>

                <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white" onClick={() => handleGet()}>
                    Get
                </button>
                <div className=' grow  h-12 flex justify-end items-center'>
                    {/* <ReactToPrint
                        trigger={() => }
                        content={() => comp.current}
                        documentTitle = 'ssa'
                    /> */}
                    <button disabled={setOutcomeData.length === 0} onClick={() => handlePrint()} className=' w-fit flex px-3 py-1 border-2 text-gray-700 cursor-pointer rounded-md'>
                        Print
                    </button>

                </div>
            </div>

            {outComeData.length !== 0 ?
                (<div>

                    <div className="flex w-full flex-col justify-start  items-center grow py-4">
                        <p className=' font-medium text-xl text-gray-700'>Student Outcome for {regNo}</p>

                        <table className="table-auto rounded-md border mt-2">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="px-4 py-2 border">Courses Name</th>
                                    <th className="px-4 py-2 border">Courses Name</th>
                                    <th className="px-4 py-2 border">CIA</th>
                                    <th className="px-4 py-2 border">ESE</th>
                                    <th className="px-4 py-2 border">Over All</th>

                                </tr>
                            </thead>
                            <tbody>
                                {outComeData.map((item, index) =>
                                    <tr key={index} className=' font-medium'>
                                        <th className="border px-4 py-2 ">{item?.code?.code}</th>
                                        <td className="border px-4 py-2 w-72 h-16 overflow-x-hidden text-center">{item?.code?.name}</td>
                                        <td className="border px-4 py-2">{calculateCiaTotal(item?.marks[0])}/160</td>
                                        <td className="border px-4 py-2">{(item?.marks[0].ESELOT) + (item?.marks[0].ESEMOT) + (item?.marks[0]?.ESEHOT)}/75</td>
                                        <td className="border px-4 py-2">{calculateCiaTotal(item?.marks[0]) + (item?.marks[0].ESELOT) + (item?.marks[0].ESEMOT) + (item?.marks[0]?.ESEHOT)}/235</td>

                                    </tr>
                                )

                                }
                            </tbody>
                        </table>

                    </div>

                    <div class="print-only" style={{ display: "none" }}>
                        <div style={{ width: '60%', padding: '1px', paddingLeft: '4px', paddingRight: '10px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                            <p style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>Student Outcome for {regNo}</p>

                            <table style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
                                <thead style={{ background: 'white', borderRadius: '0.5rem', border: '1px solid #ccc' }}>
                                    <tr style={{ height: '3rem', fontWeight: 'bold' }}>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Courses Name</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Courses Name</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >CIA</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >ESE</th>
                                        <th style={{ padding: '0.5rem', flex: '1', textAlign: 'center', border: '2px solid #ccc' }} >Over All</th>

                                    </tr>
                                </thead>
                                <tbody style={{ background: 'white' }}>
                                    {outComeData.map((item, index) =>
                                        <tr key={index} style={{ height: '55px', border: '2px solid #ccc' }}>
                                            <th style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{item?.code?.code}</th>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{item?.code?.name}</td>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{calculateCiaTotal(item?.marks[0])}/160</td>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{(item?.marks[0].ESELOT) + (item?.marks[0].ESEMOT) + (item?.marks[0]?.ESEHOT)}/75</td>
                                            <td style={{ padding: '0.5rem', overflow: 'hidden', textAlign: 'center', border: '2px solid #ccc' }}>{calculateCiaTotal(item?.marks[0]) + (item?.marks[0].ESELOT) + (item?.marks[0].ESEMOT) + (item?.marks[0]?.ESEHOT)}/235</td>

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
