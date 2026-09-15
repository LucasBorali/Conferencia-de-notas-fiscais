
import './App.css'
import ConfereNota from './pages/ConfereNota'
import hufLogo from './assets/Huf-Logo.png'

function App() {
  return (
  
  <div>

    <div className="badge">
      <div></div>
      <img src={hufLogo} alt="Logo Huf" />

    </div>

    <ConfereNota />

  </div>


   
  )
}

export default App

