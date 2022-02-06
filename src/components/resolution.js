import {
  carrersID,
  horizontalID,
  verticalID,
  getId,
  getLigne
} from "../config";

const solved = async (data) => {
  const { cases } = data.value;
  let ligneH = data.value.lignesH;
  let ligneV = data.value.lignesV;
  let carrer = data.value.carrers;
  const casesEditable = cases;

  // Creation d'un array avec la liste des Keys
  const updateKey = (proba) => {
    let result = Object.keys(proba);
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(result[i], 10);
    }
    return result;
  };

  let allProba = await setPossibility(
    ligneH,
    ligneV,
    carrer,
    data.value.casesVide
  );

  const removeProba = (id, value) => {
    const allID = Array.from(
      new Set([
        ...getLigne(id, horizontalID),
        ...getLigne(id, verticalID),
        ...getLigne(id, carrersID)
      ])
    ).filter((e) => e !== id);
    allID.forEach((e) => {
      if (allProba[e] && allProba[e].indexOf(value) !== -1) {
        const newProba = allProba[e].filter((num) => num !== value);
        allProba[e] = newProba;
        listeKey = updateKey(allProba);
      }
    });
  };

  let listeKey = updateKey(allProba);
  let probaOrderH = orderProba(allProba, horizontalID);
  let probaOrderV = orderProba(allProba, verticalID);
  let probaOrderC = orderProba(allProba, carrersID);

  // assigne les valeur qui ont qu'une proba
  const checkOneProba = () => {
    let casesCompete = true;
    while (casesCompete) {
      casesCompete = false;
      let id = [];
      listeKey.forEach((e, i) => {
        if (allProba[e] && allProba[e].length === 1) {
          casesEditable[e] = allProba[e][0];
          delete allProba[e];
          id.push(e);
        }
        if (i === listeKey.length - 1 && id.length > 0) {
          id.forEach((element) => {
            const value = casesEditable[element];
            const idEdited = element;
            removeProba(idEdited, value);
          });
          listeKey = updateKey(allProba);
          probaOrderH = orderProba(allProba, horizontalID);
          probaOrderV = orderProba(allProba, verticalID);
          probaOrderC = orderProba(allProba, carrersID);
          casesCompete = true;
        }
      });
    }
  };

  /*
    Regarde la liste des proba par ligne (Horzintal Vertical Carrer)
    Si sur une meme ligne il y a une proba qui est presente que dans une case il l'ajoute 
  */
  const checkLigne = (probaOrder, type) => {
    for (let idLigne = 0; idLigne < probaOrder.length; idLigne++) {
      for (let nb = 0; nb < 9; nb++) {
        let count = 0;
        let caseSelected = null;
        for (let idCase = 0; idCase < probaOrder[idLigne].length; idCase++) {
          if (probaOrder[idLigne][idCase].indexOf(nb) !== -1) {
            count++;
            caseSelected = idCase;
          }
          if (idCase === probaOrder[idLigne].length - 1 && count === 1) {
            const value = nb;
            const id = getId(idLigne, caseSelected, type);
            delete allProba[id];
            casesEditable[id] = value;
            removeProba(id, value);
            listeKey = updateKey(allProba);
            probaOrderC = orderProba(allProba, carrersID);
          }
        }
      }
    }
  };

  let ref = 0;
  while (ref !== listeKey.length) {
    ref = listeKey.length;
    checkLigne(probaOrderC, carrersID);
    checkLigne(probaOrderH, horizontalID);
    checkLigne(probaOrderV, verticalID);
    checkOneProba();
  }

  data.cb.endResolution();
};

const orderProba = (allProba, type) => {
  /*
    Met les possibiliter dans un array par ligne selon le type choisie (Vertical/horizontal/carrer) 
  */

  const array = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < 81; i++) {
    let count = 0;
    const value = allProba[i] || [];
    while (count < 9) {
      if (type[count].indexOf(i) !== -1) {
        array[count].push(value);
        break;
      }
      count++;
    }
  }
  return array;
};

const orderID = (allKeysVide, type) => {
  /* 
    Permet de mettre les ID dans des array selon le type choisi
    1) Lignes horizontals 
    2) Lignes verticals
    3) Les carrers
  */
  const array = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < allKeysVide.length; i++) {
    let count = 0;
    while (count < 9) {
      if (type[count].indexOf(allKeysVide[i]) !== -1) {
        array[count].push(allKeysVide[i]);
        break;
      }
      count++;
    }
  }
  return array;
};

const filterProba = (array, caseVideProba, data) => {
  const caseVide = caseVideProba;

  for (let i = 0; i < data.length; i++) {
    const existant = data[i].filter((e) => e !== "");
    for (let idCaseVide = 0; idCaseVide < array[i].length; idCaseVide++) {
      for (let nbPresent = 0; nbPresent < existant.length; nbPresent++) {
        caseVide[array[i][idCaseVide]] = caseVide[array[i][idCaseVide]].filter(
          (e) => e !== existant[nbPresent]
        );
      }
    }
  }
  return caseVide;
};

const assigneProba = async (allKeysVide, caseVide, type, refType) => {
  /* 
    Assigne des probabilités par rapport aux nombre deja present selon le type
    1) Lignes horizontals 
    2) Lignes verticals
    3) Les carrers
  */
  const array = orderID(allKeysVide, refType);
  const result = filterProba(array, caseVide, type);

  return result;
};

const setPossibility = async (lignesH, lignesV, carrers, proba) => {
  /* 
    1) Recuperer les ID des case vide dans un array
    2) Convertie les ID de String a Number 
  */

  const allKeysVide = Object.keys(proba);

  for (let i = 0; i < allKeysVide.length; i++) {
    allKeysVide[i] = parseInt(allKeysVide[i], 10);
  }

  const allProbability = await assigneProba(
    allKeysVide,
    proba,
    lignesH,
    horizontalID
  ).then((caseH) =>
    assigneProba(allKeysVide, caseH, lignesV, verticalID).then((caseV) =>
      assigneProba(allKeysVide, caseV, carrers, carrersID)
    )
  );
  return allProbability;
};

export { solved };
