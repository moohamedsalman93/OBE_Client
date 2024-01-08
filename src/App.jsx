import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';
import Home from './components/Home';
import AddMarks from './components/addMarks/addMarks';
import { useState } from 'react';
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


function App() {
  const [Role, setRole] = useState('');
  const [userName, setuserName] = useState('')
  const [userId, setuserId] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home Role={Role} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          <Route path="/" element={<AddMarks uName={userName} />} />
          <Route path="/Account" element={<Account userId={userId} />} />
          <Route path="/Outcome/Course" element={<CourseOutcome  userId={userId} />} />
          <Route path="/RelationalMatrix" element={<RelationalMatrix userId={userId} />} />
        </Route>

        <Route path="/Admin" element={<HomeAdmin Role={Role} setRole={setRole} setuserName={setuserName} setuserId={setuserId} userId={userId} userName={userName} />} >
          <Route  path="/Admin/" element={<AddMarks uName={userName} />} />
          <Route path="/Admin/Manage-Course" element={<ManageCourse />} />
          <Route path="/Admin/Manage-Department" element={<ManageDepartment />} />
          <Route path="/Admin/Manage-Staff" element={<ManageStaff />} />
          <Route path="/Admin/Outcome/Course" element={<AdminCourseOutcome />} />
          <Route path="/Admin/Outcome/Program" element={<Programs />} />
          <Route path="/Admin/Outcome/Student" element={<Students />} />
          <Route path="/Admin/Outcome/Science-Outcome" element={<Science />} />
          <Route path="/Admin/Outcome/Arts-Outcome" element={<Arts />} />
        </Route>

        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
