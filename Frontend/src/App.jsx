import {Routes,Route} from 'react-router'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Whispr } from './pages/whispr'
import { NotFound } from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="Login" element={<Login />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="Whispr" element={<Whispr />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App