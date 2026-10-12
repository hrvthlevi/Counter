class Viselkedes {
  constructor() {
    this.viselkedesAdatok = [];
    this.transitionsData = [];
  }

  feldolgozNyersAdatok(animalId, rawText) {
    const lines = rawText.split("\n");
    const behaviorGroups = {}; 

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const parts = trimmed.split(/\t+|\s{2,}/);
      if (parts.length >= 2) {
        const timeStr = parts[0].trim();
        const behavior = parts.slice(1).join(" ").trim();

        if (!behaviorGroups[behavior]) {
          behaviorGroups[behavior] = [];
        }
        behaviorGroups[behavior].push(timeStr);
      }
    });

    this.viselkedesAdatok = [];
    for (const [behavior, idopontok] of Object.entries(behaviorGroups)) {
      const csoportok = this.csoportositIdopontok(idopontok);
      csoportok.forEach(([start, end, duration]) => {
        this.viselkedesAdatok.push({ animalId, behavior, start, end, duration });
      });
    }

    this.szamitAtmenetekAutomatikus();
  }

  csoportositIdopontok(idopontok) {
    const csoportok = [];
    let aktualisCsoport = [parseFloat(idopontok[0].replace(",", "."))];

    for (let i = 1; i < idopontok.length; i++) {
      const jelenlegi = parseFloat(idopontok[i].replace(",", "."));
      const elozo = parseFloat(idopontok[i - 1].replace(",", "."));
      
      if (Math.abs(jelenlegi - elozo - 0.2) < 0.01) {
        aktualisCsoport.push(jelenlegi);
      } else {
        csoportok.push([...aktualisCsoport]);
        aktualisCsoport = [jelenlegi];
      }
    }
    csoportok.push(aktualisCsoport);
    
    return csoportok.map((csoport) => {
      let start = csoport[0];
      let end = csoport[csoport.length - 1];
      let duration = csoport.length > 1 ? (end - start).toFixed(2) : "0.00";
      return [start.toString().replace(".", ","), end.toString().replace(".", ","), duration.toString().replace(".", ",")];
    });
  }

  szamitAtmenetekAutomatikus() {
    const sorok = this.viselkedesAdatok.map(adat => adat.behavior);
    const transitionsMap = new Map();

    for (let i = 0; i < sorok.length - 1; i++) {
      const current = sorok[i];
      const nextOne = sorok[i + 1];
      const key = `${current}__SEP__${nextOne}`;
      transitionsMap.set(key, (transitionsMap.get(key) || 0) + 1);
    }

    this.transitionsData = [];
    for (let [key, count] of transitionsMap.entries()) {
      const [current, nextOne] = key.split("__SEP__");
      this.transitionsData.push({ current, nextOne, count });
    }
  }

  exportMindentEgybeCSV() {
    let csvTartalom = "";

    csvTartalom += "--- BEHAVIORS AND DURATIONS ---\n";
    csvTartalom += "Animal ID;Behavior;Start;End;Duration\n";
    this.viselkedesAdatok.forEach(({ animalId, behavior, start, end, duration }) => {
      csvTartalom += `${animalId};${behavior};${start};${end};${duration}\n`;
    });

    csvTartalom += "\n";

    csvTartalom += "--- TRANSITIONS ---\n";
    csvTartalom += "Current;Next;Count\n";
    this.transitionsData.forEach(({ current, nextOne, count }) => {
      csvTartalom += `${current};${nextOne};${count}\n`;
    });

    const blob = new Blob([csvTartalom], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "complete_analysis_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export { Viselkedes };