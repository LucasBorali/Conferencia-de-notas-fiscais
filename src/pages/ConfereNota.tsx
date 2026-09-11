import { useState } from "react"


const ConfereNota = () => {


    const [chave, setChave] = useState('')
    const [pesquisando, setPesquisando] = useState(false)

    const buscarNota = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (!chave.trim()){
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

      const documento = await response.json()

      console.log(documento)
    } catch (error) {
      console.error(error)
    } finally {
      setPesquisando(false)
    }


    }


  return (
    <main>
      <h1>Conferência de Nota Fiscal</h1>

      <form onSubmit={buscarNota}>
        <label htmlFor="chave">Chave de acesso</label>

        <div>
          <input
            id="chave"
            type="text"
            placeholder="Digite a chave da NF-e..."
            value={chave}
            onChange={(e) => setChave(e.target.value)}
          />

          <button type="submit">
            Pesquisar
          </button>
        </div>
      </form>

      <section>
        <p>Nenhuma nota consultada.</p>
      </section>
    </main>
  )
}

export default ConfereNota
