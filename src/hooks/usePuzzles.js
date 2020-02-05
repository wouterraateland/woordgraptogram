import { useCallback, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

import puzzles from "../data/puzzles.json";

const usePuzzles = () => {
  const [currentSolutionMap, setCurrentSolutionMap] = useState({});

  const save = useCallback((puzzleId, currentSolution) => {
    setCurrentSolutionMap(currentSolutionMap => {
      const next = { ...currentSolutionMap, [puzzleId]: currentSolution };

      AsyncStorage.setItem("puzzles", JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      const currentSolutionMapJSON = await AsyncStorage.getItem("puzzles");
      setCurrentSolutionMap(JSON.parse(currentSolutionMapJSON) || {});
    };

    load();
  }, []);

  return {
    puzzles: puzzles.map(puzzle => ({
      ...puzzle,
      currentSolution: currentSolutionMap[puzzle.id],
      isSolved: currentSolutionMap[puzzle.id] === puzzle.solution
    })),
    save
  };
};

export default usePuzzles;
