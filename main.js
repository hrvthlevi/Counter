import { Viselkedes } from "./viselkedes.js";
import { frissitTabla, frissitAtmenetekTabla } from "./fuggvenyek.js";

const viselkedes = new Viselkedes();

document.getElementById("process-button").addEventListener("click", () => {
  const animalId = document.getElementById("animal-id").value.trim();
  const rawText = document.getElementById("raw-data-input").value.trim();
  
  if (!rawText) return;

  viselkedes.feldolgozNyersAdatok(animalId, rawText);
  frissitTabla(viselkedes);
  frissitAtmenetekTabla(viselkedes);
});

document.getElementById("export-all-csv").addEventListener("click", () => {
  viselkedes.exportMindentEgybeCSV();
});