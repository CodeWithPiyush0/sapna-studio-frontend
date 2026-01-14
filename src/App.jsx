import './App.css'
import { Toaster } from 'react-hot-toast';
import Contact from './components/Contact';

function App() {

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Contact />
      <h1 className='text-3xl font-bold underline text-gold'>Piyush</h1>
    </>
  )
}

export default App
