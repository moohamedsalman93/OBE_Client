import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';
import Home from './components/Home';
import AddMarks from './components/addMarks/addMarks';
import { useEffect, useState } from 'react';
import Account from './components/Account/Account';
import CourseOutcome from './components/Course/CourseOutcome';
import HomeAdmin from './components/HomeAdmin';
import ManageCourse from './components/admin/ManageCourse';
import ManageDepartment from './components/admin/ManageDepartment';
import AdminCourseOutcome from './components/admin/Course/CourseOutcome';
import Programs from './components/admin/Programs/Programs';
import RelationalMatrix from './components/RelationalMatrix/RelationalMatrix';
import Students from './components/admin/Students/Students';
import Science from './components/Science/Science';
import Arts from './components/Arts/Arts';
import ManageStaff from './components/admin/ManageStaff';
import { getYearApi } from './api/api';


function App() {
  const [Role, setRole] = useState('');
  const [userName, setuserName] = useState('')
  const [userId, setuserId] = useState('')
  const [date, setDate] = useState()

  useEffect(()=>{
    getYearApi().then(res => {
      if (res.status === 200) {
        setDate(res?.data.data)
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

        <Route path="/Admin" element={<HomeAdmin Role={Role} date={date} setDate={setDate} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          <Route  path="/Admin/" element={<AddMarks uName={userName} year={date} />} />
          <Route path="/Admin/Manage-Course" element={<ManageCourse year={date}/>} />
          <Route path="/Admin/Manage-Department" element={<ManageDepartment year={date}/>} />
          <Route path="/Admin/Manage-Staff" element={<ManageStaff year={date}/>} />
          <Route path="/Admin/Outcome/Course" element={<AdminCourseOutcome year={date}/>} />
          <Route path="/Admin/Outcome/Program" element={<Programs year={date}/>} />
          <Route path="/Admin/Outcome/Student" element={<Students year={date}/>} />
          <Route path="/Admin/Outcome/Science-Outcome" element={<Science year={date}/>} />
          <Route path="/Admin/Outcome/Arts-Outcome" element={<Arts year={date}/>} />
        </Route>

        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
