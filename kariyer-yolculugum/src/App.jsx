import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [gorevler, setGorevler] = useState([])
 const [inputDegeri, setInputDegeri] = useState("")
 const [silinenler, setSilinenler] = useState([])
 const [duzenlenecekIndex, setDuzenlenecekIndex] = useState(null)
 const [duzenleniyorMu, setDuzenleniyorMu] = useState(false)
 const [duzenlenecekMetin, setDuzenlenecekMetin] = useState("")
  

function gorevEkle() {
    if (inputDegeri.trim() === "") return
    setGorevler([...gorevler, inputDegeri])
    setInputDegeri("")
  }

  function gorevSil(index) {
    const yeniListe = gorevler.filter((_, i) => i !== index)
    console.log(yeniListe, "yeniListe")
    setGorevler(yeniListe)
    setSilinenler([...silinenler, gorevler[index]])
    console.log(silinenler, "silinenler")
  }

  function silineniGeriAl () {
    setGorevler([...gorevler, silinenler[silinenler.length-1]])
    setSilinenler([])
    console.log(silinenler, "silineniGeriAl")
  }

  function gorevDuzenle (index) {
    setDuzenlenecekIndex(index)
    setDuzenleniyorMu(true)
    setDuzenlenecekMetin(gorevler[index])
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
      {silinenler.length > 0 && <button onClick={() => silineniGeriAl(silinenler.length-1)}>Geri Al</button>}    
      <ul>
        {gorevler.map((gorev, index) => (
          <li key={index}> {index === duzenlenecekIndex ? 
          <input
            value={duzenlenecekMetin}
            onChange={(e) => setDuzenlenecekMetin(e.target.value)}
          /> : 
          <span>{gorev}</span> }
          <button onClick={() => gorevDuzenle(index)}>Düzenle</button>
          <button onClick={() => gorevSil(index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
