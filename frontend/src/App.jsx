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
import ProposalsPage from "./pages/ProposalsPage";
import JobPage from "./pages/JobPage";
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout><HomePage /></Layout>} />
        <Route path='/login' element={<Layout><LoginPage/></Layout>} />
        <Route path='/register' element={<Layout><RegisterPage/></Layout>} />
        <Route path='/client' element={<Layout><div>Client Dashboard</div></Layout>} />
        <Route path='/contractor' element={<Layout><div>Contractor Dashboard</div></Layout>} />
        <Route path='/dashboard' element={<Layout><div>Dashboard</div></Layout>} />
        <Route path="/create-job" element={<Layout><CreateJob /></Layout>} />
        <Route path="/jobs" element={<Layout><JobsFeed /></Layout>} />
        <Route path="/proposals" element={<Layout><ProposalsPage /></Layout>} />
        <Route path="/jobs/:id" element={<Layout><JobPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
