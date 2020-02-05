import { CURSOR_DIRECTIONS } from "../constants";
import React, { useCallback, useRef } from "react";
import { ScrollView } from "react-native";

import usePuzzleContext from "../hooks/usePuzzleContext";

import PuzzleGrid from "./PuzzleGrid";
import TextInput from "./TextInput";
import Questions from "./Questions";

const updateCursor = (x, y, cursor, grid) => {
  if (!cursor) {
    return { x, y, direction: CURSOR_DIRECTIONS.HORIZONTAL };
  }

  if (
    cursor.direction === CURSOR_DIRECTIONS.VERTICAL &&
    x === cursor.x &&
    y !== cursor.y
  ) {
    return { x, y, direction: CURSOR_DIRECTIONS.VERTICAL };
  }

  if (x !== cursor.x || y !== cursor.y) {
    return { x, y, direction: CURSOR_DIRECTIONS.HORIZONTAL };
  }

  if (x === grid.columnX && cursor.direction === CURSOR_DIRECTIONS.HORIZONTAL) {
    return { x, y, direction: CURSOR_DIRECTIONS.VERTICAL };
  }

  return null;
};

const Puzzle = () => {
  const inputRef = useRef(null);
  const { puzzle, grid, cursor, setCursor, inputValue } = usePuzzleContext();

  const onCellPress = useCallback(
    (x, y) => {
      setCursor(cursor => {
        const nextCursor = updateCursor(x, y, cursor, grid);
        const input = inputRef.current;
        if (input && nextCursor) {
          input.focus();
        }
        return nextCursor;
      });
    },
    [grid, setCursor]
  );

  return (
    <>
      <PuzzleGrid grid={grid} cursor={cursor} onCellPress={onCellPress} />
      <TextInput
        ref={inputRef}
        autoCorrect={false}
        caretHidden
        value=""
        onChangeText={char => inputValue(char)}
        onKeyPress={event => {
          if (event.nativeEvent.key === "Backspace") {
            inputValue("");
          }
        }}
      />
      <ScrollView>
        <Questions questions={puzzle.questions} />
      </ScrollView>
    </>
  );
};

export default Puzzle;
