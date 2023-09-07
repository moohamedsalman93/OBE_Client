
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" exact element={<LoginPage/>} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
