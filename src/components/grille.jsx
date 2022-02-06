const generateLigne = (id, array) =>
  array[id] &&
  array[id].map((e, i) => {
    const borderLeftId = [0, 3, 6];
    const classBorderL =
      borderLeftId.indexOf(i) >= 0
        ? "case borderT borderR borderL"
        : "case borderT borderR";
    return (
      <div key={`${e}-${i}`} className={`${classBorderL} `}>
        {e}
      </div>
    );
  });

const generateSudoku = (carrers, array) =>
  carrers[0] &&
  carrers[0].map((e, i) => {
    const borderLeftId = [2, 5, 8];
    const classBorderB = borderLeftId.indexOf(i) >= 0 ? "borderB" : "";
    return (
      <div key={i} className={`row ${classBorderB}`}>
        {generateLigne(i, array)}
      </div>
    );
  });

export default generateSudoku;
