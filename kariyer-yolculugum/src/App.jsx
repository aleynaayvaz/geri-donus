import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [gorevler, setGorevler] = useState([])
  const [inputDegeri, setInputDegeri] = useState("")

  function gorevEkle() {
    if (inputDegeri.trim() === "") return
    setGorevler([...gorevler, inputDegeri])
    setInputDegeri("")
  }


  return (
    <div>
      <h1>Todo Uygulaması</h1>
      <input 
        value={inputDegeri}
        onChange={(e) => setInputDegeri(e.target.value)}
        placeholder="Yeni görev ekle..."
      />
      <button onClick={gorevEkle}>
        Ekle
      </button>
      <ul>
        {gorevler.map((gorev, index) => (
          <li key={index}>{gorev}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
