import { CURSOR_DIRECTIONS } from "../constants";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

import usePuzzleContext from "../hooks/usePuzzleContext";

const Wrapper = styled.View`
  flex: 1;
  min-height: 32px;
  padding: 16px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background-color: #fff;
`;

const Question = styled.View`
  padding: 4px 0;
  background-color: ${props => (props.isFocused ? "#fff59d" : "#fff")};
`;

const Strong = styled.Text`
  font-weight: bold;
`;

const Questions = ({ questions }) => {
  const { cursor } = usePuzzleContext();
  return (
    <Wrapper pointerEvents="none">
      {questions.map((q, i) => (
        <Question
          key={i}
          isFocused={
            cursor &&
            (cursor.direction === CURSOR_DIRECTIONS.VERTICAL
              ? i === 0
              : i === cursor.y + 1)
          }
        >
          <Text>
            <Strong>{i === 0 ? "Verticaal: " : `${i}. `}</Strong>
            <Text>{q}</Text>
          </Text>
        </Question>
      ))}
    </Wrapper>
  );
};

export default Questions;
