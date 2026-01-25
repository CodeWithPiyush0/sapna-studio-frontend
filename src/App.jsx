import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminGallery from './pages/AdminGallery';
import Gallery from './components/Gallery';
import ProtectedRoute from './components/ProtectedRoute';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Gallery />
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
          <Route path='/admin/gallery' element={<AdminGallery />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
