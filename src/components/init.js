const initHorizontal = (cases, cb) => {
  let id = 0;
  let array = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < cases.length; i++) {
    array[id].push(cases[i]);
    i === cases.length - 1 && cb(array);
    array[id].length === 9 && id++;
  }
};

const initCaseVide = (cases, cb) => {
  const caseVide = {};
  for (let i = 0; i < cases.length; i++) {
    if (cases[i] === "") caseVide[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (i === cases.length - 1) {
      cb(caseVide);
    }
  }
};

const initVertical = (cases, cb) => {
  let id = 0;
  let array = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < cases.length; i++) {
    array[id].push(cases[i]);
    i === cases.length - 1 && cb(array);
    id === 8 ? (id = 0) : id++;
  }
};

const initCarrer = (cases, cb) => {
  let idArray = 0;
  let incrementation = 1;
  let array = [[], [], [], [], [], [], [], [], []];
  const lastArrayKey = [2, 5, 8];

  for (let i = 0; i < cases.length; i++) {
    array[idArray].push(cases[i]);
    i === cases.length - 1 && cb(array);

    if (incrementation === 3) {
      incrementation = 1;
      lastArrayKey.indexOf(idArray) >= 0 && array[idArray].length < 9
        ? (idArray = idArray - 2)
        : (idArray = idArray + 1);
    } else {
      incrementation++;
    }
  }
};

const updateProba = (
  cases,
  setLignesHorizontal,
  setLignesVertical,
  setCarrers
) => {
  initHorizontal(cases, setLignesHorizontal);
  initVertical(cases, setLignesVertical);
  initCarrer(cases, setCarrers);
};

const showSudoku = (
  cases,
  setLignesHorizontal,
  setLignesVertical,
  setCarrers,
  setCasesVide
) => {
  initHorizontal(cases, setLignesHorizontal);
  initVertical(cases, setLignesVertical);
  initCarrer(cases, setCarrers);
  initCaseVide(cases, setCasesVide);
};

export { showSudoku, updateProba };
