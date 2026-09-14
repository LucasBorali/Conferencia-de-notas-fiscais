import type { ItemNota } from "../models/ItemNota";

export const parseXmlToItemNota = (xmlString: string): ItemNota[] => {
  const parser = new DOMParser();
  
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  const items: ItemNota[] = [];

  const dets = xmlDoc.getElementsByTagName("det");

  for (const det of Array.from(dets)) {
    const prod = det.getElementsByTagName("prod")[0];

    if (prod) {
      const cfop = prod.getElementsByTagName("CFOP")[0]?.textContent || "";
      if (cfop == "5124"){
         const codigo = prod.getElementsByTagName("cProd")[0]?.textContent || "";
        const descricao = prod.getElementsByTagName("xProd")[0]?.textContent || "";
        const quantidadeStr = prod.getElementsByTagName("qCom")[0]?.textContent || "0";
        const quantidade = parseFloat(quantidadeStr);
        const quantidadeConferida = 0;
        items.push({ codigo, descricao, quantidade, quantidadeConferida});
      }
     
    }
  }
  return items;
}