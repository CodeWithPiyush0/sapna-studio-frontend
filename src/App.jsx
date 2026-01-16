import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Contact />
  </>
);

function App() {

  return (
    <Router>
      <Toaster position='top-center' reverseOrder={false} />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
