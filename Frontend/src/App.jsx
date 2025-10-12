import './App.css'
import Home from './Pages/Home'
import Work from './Pages/Work'
import Resume from './Pages/Resume'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mywork" element={<Work />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="toast-container"
        toastClassName="custom-toast"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
      />
    </BrowserRouter>
  )
}

export default App
