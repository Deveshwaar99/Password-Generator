import './App.css'
import PasswordGenerator from './components/PasswordGenerator'
import { ToastProvider } from './components/ui/toast'

function App() {
  return (
    <>
      <ToastProvider>
        <PasswordGenerator />
      </ToastProvider>
    </>
  )
}

export default App
