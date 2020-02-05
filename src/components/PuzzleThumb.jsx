import React from "react";
import styled from "styled-components";

const Wrapper = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;
  margin: 8px;
  border: 1px solid #0002;

  border-radius: 16px;
  box-shadow: 0 2px 6px #0004;

  background-color: ${props => (props.isSolved ? "#4caf50" : "#fff")};
`;

const Number = styled.Text`
  font-weight: bold;
  font-size: 32px;

  color: ${props => (props.isSolved ? "#fff" : "#000")};
`;

const PuzzleThumb = ({ isSolved, number, onClick }) => (
  <Wrapper isSolved={isSolved} onPress={onClick}>
    <Number isSolved={isSolved}>{number}</Number>
  </Wrapper>
);

export default PuzzleThumb;
