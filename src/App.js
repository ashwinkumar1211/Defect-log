import logo from './logo.svg';
import './App.css';
import SignonTracker from './components/SignonTracker';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefectHandler from './components/DefectHandler';
import AddDefect from './components/AddDefect';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignonTracker />} />
        <Route path='/view-defects' element={<DefectHandler />} />
        <Route path='/add-defect' element={<AddDefect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
