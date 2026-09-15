import { useState } from "react"
import type { ItemNota } from "../models/ItemNota"
import { parseEtiqueta } from "../utils/etiquetaFunctions"
import classes from "./ConferenciaNota.module.css"

interface ConferenciaNotaProps {
  items: ItemNota[]
  setItems: React.Dispatch<React.SetStateAction<ItemNota[]>>
}

const ConferenciaNota = ({ items, setItems }: ConferenciaNotaProps   ) => {
    const [etiqueta, setEtiqueta] = useState('')


    const lerEtiqueta = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!etiqueta.trim()) {
    return
  }

  const etiquetaLida = parseEtiqueta(etiqueta)
  

  if (!etiquetaLida) {
    setEtiqueta('')
    return
  }

  setItems(itensAtuais => {
    const itemEncontrado = itensAtuais.find(
      item => item.codigo === etiquetaLida.codigoItem
    )

    if (!itemEncontrado) {
      console.log('Item não encontrado na nota')
      return itensAtuais
    }

    return itensAtuais.map(item => {
      if (item.codigo !== etiquetaLida.codigoItem) {
        return item
      }

      return {
        ...item,
        quantidadeConferida:
          item.quantidadeConferida + etiquetaLida.quantidade
      }
    })
  })

  setEtiqueta('')
}

  return (
     <section className={classes["conferencia-container"]}>
      
     
      
  <h2>Itens da nota</h2>

{items.map(item => {
  const progresso =
    Math.min(
      (item.quantidadeConferida / item.quantidade) * 100,
      100
    )

  const concluido =
    item.quantidadeConferida >= item.quantidade

  return (
    <div
      key={item.codigo}
      className={`${classes.itemRow} ${
        concluido ? classes.concluido : ''
      }`}
    >
      <div className={classes.itemInfo}>
        <span>{item.codigo}</span>

        <span>
          {item.quantidadeConferida} / {item.quantidade}
        </span>
      </div>

      <div className={classes.progressBar}>
        <div
          className={classes.progress}
          style={{ width: `${progresso}%` }}
        />
      </div>
    </div>
    
  )
})}
<section>
</section>

      <form onSubmit={lerEtiqueta}>
        <input
          type="text"
          autoFocus
          placeholder="Aguardando leitura..."
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
        />
      </form>   
    </section>
  )
}

export default ConferenciaNota
