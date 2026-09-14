import type { Etiqueta } from "../models/Etiqueta"

export const parseEtiqueta = (value: string): Etiqueta => {
    const match = value.match(/\((\d+)\)\{(\d+)/)


    if (!match) {
        throw new Error('Formato de etiqueta inválido')
    }
    return {
        quantidade: parseInt(match[1]),
        codigoItem: match[2]
    }
}