//@ts-nocheck

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseText(htmlString: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, "text/html")

  // Récupère le texte sans les balises HTML
  const text = doc.body.textContent || ""

  // Récupère les éléments <br> et remplace-les par des sauts de ligne
  const lineBreaks = []
  const brElements = doc.getElementsByTagName("br")

  // Collecte les sections de texte entre les <br>
  let lastIndex = 0
  for (let br of brElements) {
    const precedingText = text.substring(lastIndex, br.previousSibling.textContent.length)
    lineBreaks.push(precedingText.trim())
    lastIndex = br.previousSibling.textContent.length
  }

  // Ajoute le reste du texte après le dernier <br>
  lineBreaks.push(text.substring(lastIndex).trim())

  return lineBreaks.filter((line) => line) // Filtrer les lignes vides
}

export function formatMachineNames(
  text: string,
  specialCases: Record<string, string> = {}
): string {
  // Check if the text matches a special case, and return the mapped value if it does
  if (specialCases[text]) {
    return specialCases[text]
  }

  // Replace underscores and hyphens with spaces
  let readableText = text.replace(/[_-]/g, " ")

  // Capitalize the first letter of each word
  readableText = readableText
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return readableText
}
