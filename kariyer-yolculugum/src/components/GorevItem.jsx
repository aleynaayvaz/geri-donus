import { useRef, useEffect } from 'react'

function GorevItem({ gorev, index, gorevSil, gorevDuzenle, gorevKaydet, duzenlenecekIndex, duzenlenecekMetin, setDuzenlenecekMetin, gorevTamamla}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (index === duzenlenecekIndex) {
      inputRef.current.focus()
    }
  }, [duzenlenecekIndex])
  
  return (
    <li className="group w-full flex justify-between items-center bg-gray-800 p-2 rounded-xl border border-blue-500/30 text-white mb-3 shadow-md transition-all hover:border-blue-500" key={index}> {index === duzenlenecekIndex ? 
    <input 
        className="px-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={duzenlenecekMetin}
        onChange={(e) => setDuzenlenecekMetin(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            gorevKaydet(index)
          }
        }}
        ref={inputRef}
    /> : 
    <span className={`mx-2 ${gorev.tamamlandi ? "line-through text-gray-400" : ""}`}>{gorev.metin}</span> }
    {index === duzenlenecekIndex ?
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => gorevKaydet(index)}>Kaydet</button> :
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity"> 
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium" onClick={() => gorevDuzenle(index)}>Düzenle</button>
            <button className="text-red-400 hover:text-red-300 text-sm font-medium" onClick={() => gorevSil(index)}>Sil</button>
        </div>
    }
    <input type="checkbox" onChange={() => gorevTamamla(index)} checked={gorev.tamamlandi} />    </li>
  )
}

export default GorevItem