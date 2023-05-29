import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DK from './pages/DK';
import Navigation from './pages/Navigation';
import FearIndex from './pages/FearIndex/index';

import './App.css';
import { Button } from 'antd';

export default function App() {
  return (
    <Router>
      <Link className='fixed-home' to="/"><Button>Home</Button></Link>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/dk" element={<DK />} />
        <Route path="/fearIndex" element={<FearIndex />} />
      </Routes>
    </Router>
  );
}
