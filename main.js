import { Viselkedes } from "./viselkedes.js";
import { frissitTabla, frissitAtmenetekTabla } from "./fuggvenyek.js";

const viselkedes = new Viselkedes();

document.getElementById("hozzaad-button").addEventListener("click", () => {
  const animalId = document.getElementById("animal-id").value.trim();
  const behavior = document.getElementById("behavior").value.trim();
  const idopontok = document.getElementById("duration").value.trim().split("\n");

  if (animalId && behavior && idopontok.length) {
    viselkedes.rogzitMegfigyeles(animalId, behavior, idopontok);
    frissitTabla(viselkedes);
    frissitAtmenetekTabla(viselkedes);
  }
});

document.getElementById("export-all-csv").addEventListener("click", () => {
  viselkedes.exportMindentEgybeCSV();
});