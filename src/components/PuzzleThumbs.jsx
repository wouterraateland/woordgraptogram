import React from "react";
import styled from "styled-components";

import usePuzzlesContext from "../hooks/usePuzzlesContext";

import PuzzleThumb from "./PuzzleThumb";

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const PuzzleThumbs = ({ onThumbClick }) => {
  const { puzzles } = usePuzzlesContext();

  return (
    <Wrapper>
      {puzzles.map(puzzle => (
        <PuzzleThumb
          key={puzzle.id}
          number={puzzle.number}
          isSolved={puzzle.isSolved}
          onClick={() => onThumbClick(puzzle.id)}
        />
      ))}
    </Wrapper>
  );
};

export default PuzzleThumbs;
