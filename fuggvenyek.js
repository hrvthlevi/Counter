function frissitTabla(viselkedes) {
  const tablaTorzs = document.getElementById("eredmenyek-torzs");
  tablaTorzs.innerHTML = "";
  viselkedes.viselkedesAdatok.forEach(({ animalId, behavior, start, end, duration }) => {
    const sor = `<tr>
          <td>${animalId}</td>
          <td>${behavior}</td>
          <td>${start}</td>
          <td>${end}</td>
          <td>${duration}</td>
        </tr>`;
    tablaTorzs.innerHTML += sor;
  });
}

function frissitAtmenetekTabla(viselkedes) {
  const tablaTorzs = document.getElementById("transitions-torzs");
  tablaTorzs.innerHTML = "";
  viselkedes.transitionsData.forEach(({ current, nextOne, count }) => {
    const sor = `<tr>
          <td>${current}</td>
          <td>${nextOne}</td>
          <td>${count}</td>
        </tr>`;
    tablaTorzs.innerHTML += sor;
  });
}

export { frissitTabla, frissitAtmenetekTabla };