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


function App() {
  const [Role, setRole] = useState('');
  const [userName, setuserName] = useState('')
  const [userId, setuserId] = useState('')
  const [date, setDate] = useState()
  const [currentYear, setCurrentYear] = useState()

  useEffect(()=>{
    getYearApi().then(res => {
      if (res?.status === 200) {
        setDate(res?.data.data)
        setCurrentYear(res?.data.data)
      }
    })
  },[])


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home Role={Role} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          <Route path="/" element={<AddMarks uName={userName} year={date} />} />
          <Route path="/Account" element={<Account userId={userId} year={date} />} />
          <Route path="/Outcome/Course" element={<CourseOutcome  userId={userId} year={date}/>} />
          <Route path="/RelationalMatrix" element={<RelationalMatrix userId={userId} year={date} />} />
        </Route>

        <Route path="/Admin" element={<HomeAdmin Role={Role} date={date} setDate={setDate} year={currentYear} setCurrentYear={setCurrentYear} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          <Route  path="/Admin/" element={<AddMarks uName={userName} year={date} />} />
          <Route path="/Admin/Outcome/" element={<Outcome year={date}/>} />
          <Route path="/Admin/reports" element={<Reports year={date}/>} />
          <Route path="/Admin/manage" element={<Manage year={date}/>} />
        </Route>

        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
