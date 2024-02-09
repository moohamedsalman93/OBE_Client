import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';
import Home from './components/Home';
import AddMarks from './components/addMarks/addMarks';
import { useEffect, useState } from 'react';
import Account from './components/Account/Account';
import CourseOutcome from './components/Course/CourseOutcome';
import HomeAdmin from './components/HomeAdmin';
import RelationalMatrix from './components/RelationalMatrix/RelationalMatrix';
import { getYearApi } from './api/api';
import Reports from './components/admin/Reports';
import Manage from './components/admin/Manage';
import Outcome from './components/admin/Outcome';
import AboutUs from './components/AboutUs';
import Dashboard from './components/dashboard/Dashboard';



function App() {
  const [Role, setRole] = useState('');
  const [userName, setuserName] = useState('')
  const [userId, setuserId] = useState('')
  const [date, setDate] = useState()
  const [currentYear, setCurrentYear] = useState()
  const [currentSem, setCurrentSem] = useState('odd')

  useEffect(() => {
    getYearApi().then(res => {
      if (res?.status === 200) {
        setDate(res?.data.data)
        setCurrentYear(res?.data.data)
      }
    })
  }, [])


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home Role={Role} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} currentSem={currentSem} setCurrentSem={setCurrentSem} currentYear={currentYear} />} >
          {currentYear && date && (
            <Route path="/" element={<Dashboard uName={userName} year={date} currentSem={currentSem} />} />
          )}
          <Route path="/addmarks" element={<AddMarks uName={userName} year={date} currentSem={currentSem} />} />
          <Route path="/Account" element={<Account userId={userId} year={date} currentSem={currentSem} />} />
          <Route path="/Outcome/Course" element={<CourseOutcome userId={userId} year={date} currentSem={currentSem} />} />
          <Route path="/RelationalMatrix" element={<RelationalMatrix userId={userId} year={date} currentSem={currentSem} />} />
        </Route>

        <Route path="/Admin" element={<HomeAdmin Role={Role} date={date} setDate={setDate} year={currentYear} setCurrentYear={setCurrentYear} currentSem={currentSem} setCurrentSem={setCurrentSem} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          {currentYear && date && (
            <Route path="/Admin/" element={<Dashboard uName={userName} year={date} currentSem={currentSem} />} />
          )}
          <Route path="/Admin/addmarks" element={<AddMarks uName={userName} year={date} currentSem={currentSem} />} />
          <Route path="/Admin/Outcome" element={<Outcome year={date} currentSem={currentSem} />} />
          <Route path="/Admin/reports" element={<Reports year={date} currentSem={currentSem} />} />
          <Route path="/Admin/manage" element={<Manage year={date} currentSem={currentSem} />} />
        </Route>

        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/AboutUs" exact element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
