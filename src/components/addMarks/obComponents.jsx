import React from 'react'

function ObComponents({examType,handleSetExamtype,value,textlabel}) {
    return (
        <label
            className={`transition-all duration-300 ${examType === value
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
                } hover:bg-blue-400 px-2 py-1 rounded-md cursor-pointer font-medium`}
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
