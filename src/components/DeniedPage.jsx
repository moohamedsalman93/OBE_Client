import React from 'react'

function DeniedPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-xl mt-4">You are attempting to access from outside of JMC campus.</p>
      <p className="text-md mt-2">Please connect to the campus network to proceed.</p>
    </div>
  )
}

export default DeniedPage
