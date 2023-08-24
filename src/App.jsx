
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResultPage from './components/Result';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/result/:regNo" element={<ResultPage />} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
