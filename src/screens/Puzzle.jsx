import React from "react";
import styled from "styled-components";

import usePuzzleContext from "../hooks/usePuzzleContext";

import PuzzleContainer from "../containers/Puzzle";
import Puzzle from "../components/Puzzle";
import BackButton from "../components/BackButton";
import CompletionBadge from "../components/CompletionBadge";

const Outer = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;

const Inner = styled.KeyboardAvoidingView`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
  padding-top: 40px;
`;

const PuzzleTitle = styled.Text`
  font-weight: bold;
`;

const PuzzleScreen = ({ navigation }) => {
  const { puzzle, grid, setCursor, isSolved } = usePuzzleContext();

  return (
    <Outer onPress={() => setCursor(null)}>
      <Inner behavior="padding" enabled>
        <BackButton onPress={() => navigation.navigate("Home")} />
        {isSolved && <CompletionBadge />}
        <PuzzleTitle>PUZZEL {puzzle.number}</PuzzleTitle>
        <Puzzle grid={grid} />
      </Inner>
    </Outer>
  );
};

export default ({ navigation }) => (
  <PuzzleContainer {...navigation.state.params}>
    <PuzzleScreen navigation={navigation} />
  </PuzzleContainer>
);
