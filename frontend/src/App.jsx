

import './App.css'
import LoginPage from './pages/LoginPage'
import SingUpFrom from './pages/SignUpForm'
import {Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SingUpFrom />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  ) 
}

export default App
