import { Routes, Route } from 'react-router-dom';
import { Log } from './components/Log';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import {Landing} from './components/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Log />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
