import { useState, useEffect } from 'react'
import './App.css'
import GorevItem from './components/GorevItem'

function App() {
 const [gorevler, setGorevler] = useState([])
 const [inputDegeri, setInputDegeri] = useState("")
 const [silinenler, setSilinenler] = useState([])
 const [duzenlenecekIndex, setDuzenlenecekIndex] = useState(null)
 const [duzenlenecekMetin, setDuzenlenecekMetin] = useState("")
 const [hataMetni, setHataMetni] = useState("")
 
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
    if (inputDegeri.trim() !== "") {
      setGorevler([...gorevler, {metin: inputDegeri, tamamlandi: false}])
      setInputDegeri("")
      setHataMetni("")
    } else 
      setHataMetni("Lütfen geçerli bir görev girin.")
    }

  function gorevSil(index) {
    const yeniListe = gorevler.filter((_, i) => i !== index)
    setGorevler(yeniListe)
    setSilinenler([...silinenler, gorevler[index].metin])
  }

  function silineniGeriAl () {
    setGorevler([...gorevler, silinenler[silinenler.length-1]])
    setSilinenler([])
  }

  function gorevDuzenle (index) {
    setDuzenlenecekIndex(index)
    setDuzenlenecekMetin(gorevler[index].metin)
  }

  function gorevKaydet (index) {
    const yeniListe = gorevler.map((gorev, i) => i === index ? {...gorev, metin: duzenlenecekMetin } : gorev)
    setGorevler(yeniListe)
    setDuzenlenecekIndex(null)
  }

  function gorevTamamla(index) {
    const yeniListe = gorevler.map((gorev, i) => i === index ? {...gorev, tamamlandi: !gorev.tamamlandi } : gorev)
    setGorevler(yeniListe)
    console.log(gorevler, "tamamlandı mı")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="bg-gray-900 text-white flex flex-col items-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Todo Uygulaması</h1>
        <div className="flex gap-6">
          <div className="">
            <input 
              className="p-4 rounded-lg bg-gray-800 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputDegeri}
              onChange={(e) => setInputDegeri(e.target.value)}
              placeholder="Yeni görev ekle..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  gorevEkle()
                }
              }}
            />
            {hataMetni && <p className="mt-2 text-sm text-red-500">{hataMetni}</p> }
          </div>
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
          <GorevItem 
            key={index} 
            index={index}
            gorev={gorev}
            gorevSil={gorevSil}
            gorevDuzenle={gorevDuzenle}
            gorevKaydet={gorevKaydet}
            duzenlenecekIndex={duzenlenecekIndex}
            duzenlenecekMetin={duzenlenecekMetin}
            setDuzenlenecekMetin={setDuzenlenecekMetin}
            gorevTamamla={gorevTamamla}
          />
        ))}
      </ul>
      </div>
    </div>
  )
}

export default App
