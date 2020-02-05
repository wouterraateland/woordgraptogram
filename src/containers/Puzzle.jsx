import React from "react";
import { PuzzleContext } from "../contexts";

import usePuzzle from "../hooks/usePuzzle";

const Puzzle = ({ puzzleId, children }) => {
  const value = usePuzzle({ puzzleId });
  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};

export default Puzzle;
