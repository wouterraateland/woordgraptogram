import React, { useCallback } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

import PuzzleThumbs from "../components/PuzzleThumbs";

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: bold;
`;

const HomeScreen = ({ navigation }) => {
  const startPuzzle = useCallback(
    puzzleId => navigation.navigate("Puzzle", { puzzleId }),
    [navigation]
  );

  return (
    <LinearGradient
      colors={["#fdd835", "#fff"]}
      locations={[0.5, 0.5001]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Wrapper>
        <Title>Woordgraptogram</Title>
        <PuzzleThumbs onThumbClick={startPuzzle} />
      </Wrapper>
    </LinearGradient>
  );
};

export default HomeScreen;
