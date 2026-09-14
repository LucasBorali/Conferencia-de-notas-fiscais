import { useState } from "react"
import type { ItemNota } from "../models/ItemNota"
import { parseEtiqueta } from "../utils/etiquetaFunctions"

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
  console.log('Etiqueta lida:', etiquetaLida)

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
     <section>
      <h2>Nota encontrada</h2>

      <p>
        Foram encontrados {items.length} itens nesta nota.
      </p>

      <section>
  <h2>Itens da nota</h2>

  {items.map((item, index) => (
    <div key={index}>
      <strong>{item.descricao}</strong>

      <div>
        Código: {item.codigo}
      </div>

      <div>
        {item.quantidadeConferida} / {item.quantidade}
      </div>
    </div>
  ))}
</section>

      <p>
        Aponte o coletor para uma etiqueta na caixa
        para iniciar a conferência.
      </p>
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
