import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';
import Home from './components/Home';
import { Result } from './components/Result';
import AddMarks from './components/addMarks/addMarks';
import { useState } from 'react';


function App() {
  const [Role, setRole] = useState('');

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home Role={Role} setRole={setRole}/>} />
      <Route path="/result" element={<Result/>} /> 
      <Route path="/addmarks" element={<AddMarks/>} /> 

      <Route path="/login" exact element={<LoginPage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
