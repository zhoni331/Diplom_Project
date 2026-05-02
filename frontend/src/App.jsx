import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CreateJob from "./pages/CreateJob";
import JobsFeed from "./pages/JobsFeed";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/client' element={<div>Client Dashboard</div>} />
        <Route path='/contractor' element={<div>Contractor Dashboard</div>} />
        <Route path='/dashboard' element={<div>Dashboard</div>} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<JobsFeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
