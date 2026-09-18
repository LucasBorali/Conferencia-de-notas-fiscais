import { useState } from "react"
import type { DocumentoFiscal } from "../models/DocumentoFiscal"
import type { ItemNota } from "../models/ItemNota"
import { parseXmlToItemNota } from "../utils/xmlFunctions"
import ConferenciaNota from "../components/ConferenciaNota"
import classes from "./ConfereNota.module.css"



const ConfereNota = () => {


    const [chave, setChave] = useState('')
    const [pesquisando, setPesquisando] = useState(false)
    const [documento, setDocumento] = useState<DocumentoFiscal | null>(null)
    const [items, setItems] = useState<ItemNota[]>([])


  const buscarNota = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!chave.trim()) {
      return
    }

    setPesquisando(true)

    try {
      const response = await fetch(
        `/api/Documentos?pesquisa=${encodeURIComponent(chave.trim())}`
      )

      if (!response.ok) {
        throw new Error('Erro ao consultar a API')
      }

      const documentos: DocumentoFiscal[] = await response.json()

      const documentoEncontrado = documentos[0] || null

      setDocumento(documentoEncontrado)

      if (documentoEncontrado?.xmlString) {
        const itens = parseXmlToItemNota(documentoEncontrado.xmlString)
        

        setItems(itens)

      } else {
        setItems([])
      }

    } catch (error) {
      console.error(error)
      setDocumento(null)
      setItems([])
    } finally {
      setPesquisando(false)
    }
  }




  return (
    <main >


      
{documento ? (
  <ConferenciaNota items={items} setItems={setItems} chave={chave}/>
) : (
  <div>
    {pesquisando ? (
      <span className={classes["loader"]} />
    ) : (
      <div className={classes["confere-nota"]}>
         <h1>Conferência de Nota Fiscal</h1>

      <form onSubmit={buscarNota}>
        

        <div>
          <input
            id="chave"
            type="text"
            placeholder="Insira a chave da NF-e..."
            value={chave}
            onChange={(e) => setChave(e.target.value)}
          />

          <button type="submit">
            Pesquisar
          </button>

          
        </div>
      </form>
      </div>
    )}
   
  </div>
)}
    </main>
  )
}

export default ConfereNota
