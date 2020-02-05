import React from "react";
import { PuzzlesContext } from "../contexts";

import usePuzzles from "../hooks/usePuzzles";

const Puzzles = ({ puzzleId, children }) => {
  const value = usePuzzles({ puzzleId });
  return (
    <PuzzlesContext.Provider value={value}>{children}</PuzzlesContext.Provider>
  );
};

export default Puzzles;
