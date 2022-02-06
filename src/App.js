import React, { useState } from "react";
import "./styles.css";
import generateSudoku from "./components/grille";
import { solved } from "./components/resolution";
import { showSudoku, updateProba } from "./components/init";
import { sudoku /* , sudoku2, sudoku3 */ } from "./config";

export default function App() {
  const [cases, setCases] = useState(sudoku[0]);
  const [casesVide, setCasesVide] = useState({});
  const [lignesHorizontal, setLignesHorizontal] = useState([]);
  const [lignesVertical, setLignesVertical] = useState([]);
  const [carrers, setCarrers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const data = {
    value: {
      casesVide,
      carrers,
      lignesV: lignesVertical,
      lignesH: lignesHorizontal,
      cases
    },
    cb: {
      setCases,
      updateProba,
      setLignesHorizontal,
      setLignesVertical,
      setCarrers,
      resolution: () => resolution(),
      endResolution: () => {
        setDisabled(false);
        showSudoku(
          cases,
          setLignesHorizontal,
          setLignesVertical,
          setCarrers,
          setCasesVide
        );
      }
    }
  };

  const resolution = () => {
    solved(data);
  };

  return (
    <div className="App">
      <div className="grille">
        <div className="sudoku">
          <div className="container">
            {generateSudoku(carrers, lignesHorizontal)}
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-4 mr-4"
        onClick={() =>
          showSudoku(
            cases,
            setLignesHorizontal,
            setLignesVertical,
            setCarrers,
            setCasesVide
          )
        }
      >
        Afficher le sudoku
      </button>
      <button
        disabled={disabled}
        className="btn btn-primary mt-4"
        onClick={() => {
          setDisabled(true);
          resolution();
        }}
      >
        Résolution
      </button>
    </div>
  );
}
