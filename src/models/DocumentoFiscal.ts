import type { Evento } from "./Evento"

export interface DocumentoFiscal {
    id: string
  chaveAcesso: string
  xmlString?: string
  eventos: Evento[]
}