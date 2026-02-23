import { useState, useEffect } from 'react'
import './App.css'

function App() {
 const [gorevler, setGorevler] = useState([])
 const [inputDegeri, setInputDegeri] = useState("")
 const [silinenler, setSilinenler] = useState([])
 const [duzenlenecekIndex, setDuzenlenecekIndex] = useState(null)
 const [duzenlenecekMetin, setDuzenlenecekMetin] = useState("")
  
useEffect(() => {
  const kayitliGorevler = JSON.parse(localStorage.getItem('gorevler'))
  if (kayitliGorevler) {
    setGorevler(kayitliGorevler)
  }
}, [])

useEffect(() => {
  if (gorevler.length > 0) {
    localStorage.setItem('gorevler', JSON.stringify(gorevler))
  }
}, [gorevler])


function gorevEkle() {
    if (inputDegeri.trim() === "") return
    setGorevler([...gorevler, inputDegeri])
    setInputDegeri("")
    console.log(localStorage.getItem('gorevler'), "localdeki görevler görev ekle")

  }

  function gorevSil(index) {
    const yeniListe = gorevler.filter((_, i) => i !== index)
    setGorevler(yeniListe)
    setSilinenler([...silinenler, gorevler[index]])
  }

  function silineniGeriAl () {
    setGorevler([...gorevler, silinenler[silinenler.length-1]])
    setSilinenler([])
  }

  function gorevDuzenle (index) {
    setDuzenlenecekIndex(index)
    setDuzenlenecekMetin(gorevler[index])
  }

  function gorevKaydet (index) {
    const yeniListe = gorevler.map((gorev, i) => i === index ? duzenlenecekMetin : gorev)
    setGorevler(yeniListe)
    setDuzenlenecekIndex(null)
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="bg-gray-900 text-white flex flex-col items-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Todo Uygulaması</h1>
        <div className="flex gap-6">
          <input 
            className="p-4 rounded-lg bg-gray-800 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputDegeri}
            onChange={(e) => setInputDegeri(e.target.value)}
            placeholder="Yeni görev ekle..."
          />
          <button 
            className="p-4 bg-blue-700 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
            onClick={gorevEkle}>
            Ekle
          </button>
          {silinenler.length > 0 && <button className="p-2 bg-blue-700 text-white rounded-xl font-bold hover:text-blue-300 text-sm font-medium" onClick={() => silineniGeriAl(silinenler.length-1)}>Geri Al</button>}    
        </div>
      <h2 className="gap-3 mt-8 text-xl font-bold ">Görev Listesi</h2>
      <ul className="w-full mt-6">
        {gorevler.map((gorev, index) => (
          <li className="group w-full flex justify-between items-center bg-gray-800 p-2 rounded-xl border border-blue-500/30 text-white mb-3 shadow-md transition-all hover:border-blue-500" key={index}> {index === duzenlenecekIndex ? 
          <input
            className="px-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={duzenlenecekMetin}
            onChange={(e) => setDuzenlenecekMetin(e.target.value)}
          /> : 
          <span className="mx-2">{gorev}</span> }
          {index === duzenlenecekIndex ?
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => gorevKaydet(index)}>Kaydet</button> :
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity"> 
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => gorevDuzenle(index)}>Düzenle</button>
            <button className="text-red-400 hover:text-red-300 text-sm font-medium" onClick={() => gorevSil(index)}>Sil</button>
          </div>
          }
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default App
