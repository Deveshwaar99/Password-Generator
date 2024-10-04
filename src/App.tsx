import './App.css'
import PasswordGenerator from './components/PasswordGenerator'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center ">
      <PasswordGenerator />
      <Toaster />
    </div>
  )
}

export default App
