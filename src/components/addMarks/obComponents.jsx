import React from 'react'

function ObComponents({examType,handleSetExamtype,value,textlabel}) {
    return (
        <label
            className={`transition-all duration-300 ${examType === value
                ? "bg-[#4f72cc] text-white"
                : "bg-slate-200"
                } hover:bg-[#4f72cc] hover:text-white px-2 py-1 rounded-md cursor-pointer font-medium`}
        >
            <input
                type="radio"
                value={value}
                checked={examType === value}
                onChange={handleSetExamtype}
                className="sr-only" // Hide the actual radio button
            />
            {textlabel}
        </label>
    )
}

export default ObComponents
