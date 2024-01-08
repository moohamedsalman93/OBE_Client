import React from 'react';

const PrintComponent = ({ outComeData, calculateCiaTotal }) => {
  return (
    <div>
      <p className='font-medium text-xl text-gray-700'>Student Outcome for {regNo}</p>
      <table className="table-auto rounded-md border mt-2">
        {/* ... (rest of the table content) ... */}
      </table>
    </div>
  );
}

export default PrintComponent;