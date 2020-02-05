import { CURSOR_DIRECTIONS } from "../constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "react-native";

import usePuzzlesContext from "./usePuzzlesContext";

const generateLine = (currentLine, line, y) => {
  const currentChars = currentLine.split("");
  const chars = line.split("");
  const startX = chars.findIndex(char => char !== " ");

  return {
    y,
    startX,
    endX: line.length,
    cells: chars
      .map((correctValue, x) => ({ x, value: currentChars[x], correctValue }))
      .slice(startX)
  };
};

const generateGrid = ({ currentSolution, solution, columnX }) => {
  const currentLines = (currentSolution || "").split("\n");
  const lines = solution.split("\n");

  return {
    width: Math.max(...lines.map(line => line.length)),
    height: lines.length,
    columnX,
    rows: lines.map((line, y) => generateLine(currentLines[y] || "", line, y))
  };
};

const isValidChar = char =>
  char === "" || (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90);

const advanceCursor = (cursor, grid) =>
  cursor === null
    ? null
    : cursor.direction === CURSOR_DIRECTIONS.VERTICAL
    ? cursor.y < grid.height - 1
      ? { ...cursor, y: cursor.y + 1 }
      : null
    : cursor.x < grid.rows[cursor.y].endX - 1
    ? { ...cursor, x: cursor.x + 1 }
    : null;

const usePuzzle = ({ puzzleId }) => {
  const { puzzles, save } = usePuzzlesContext();
  const puzzle = useMemo(() => puzzles.find(puzzle => puzzle.id === puzzleId), [
    puzzles,
    puzzleId
  ]);
  const [{ cursor, grid, isSolved }, setState] = useState({
    cursor: null,
    grid: generateGrid(puzzle),
    isSolved: puzzle.isSolved
  });

  const setCursor = useCallback(
    v =>
      setState(state => {
        const nextCursor = typeof v === "function" ? v(state.cursor) : v;

        return {
          ...state,
          cursor: nextCursor
        };
      }),
    []
  );

  const inputValue = useCallback(s => {
    const char = s.charAt(0).toUpperCase();
    if (!isValidChar(char)) {
      return;
    }

    setState(({ cursor, grid, ...state }) => ({
      ...state,
      cursor: char ? advanceCursor(cursor, grid) : cursor,
      grid: {
        ...grid,
        rows:
          cursor === null
            ? grid.rows
            : grid.rows.map(row =>
                row.y === cursor.y
                  ? {
                      ...row,
                      cells: row.cells.map(cell =>
                        cell.x === cursor.x
                          ? {
                              ...cell,
                              value: char
                            }
                          : cell
                      )
                    }
                  : row
              )
      }
    }));
  }, []);

  useEffect(() => {
    if (cursor === null) {
      Keyboard.dismiss();
    }
  }, [cursor]);

  useEffect(() => {
    if (
      grid.rows.every(row =>
        row.cells.every(cell => cell.value === cell.correctValue)
      )
    ) {
      setState(state => ({
        ...state,
        isSolved: true
      }));
    }
  }, [puzzle, grid]);

  useEffect(() => {
    return () =>
      setState(state => {
        save(
          puzzleId,
          state.grid.rows
            .map(row =>
              " "
                .repeat(row.startX)
                .concat(row.cells.map(cell => cell.value || " ").join(""))
            )
            .join("\n")
        );
        return state;
      });
  }, []);

  return {
    puzzle,
    grid,
    cursor,
    setCursor,
    inputValue,
    isSolved
  };
};

export default usePuzzle;
