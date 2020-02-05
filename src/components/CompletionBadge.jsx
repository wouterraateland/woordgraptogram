import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
  position: absolute;
  top: 32px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 24px;
  box-shadow: 0 2px 6px #0004;

  background-color: #4caf50;
`;

const CheckMark = styled.Text`
  font-weight: bold;
  font-size: 32px;
  color: #fff;
`;

const CompletionBadge = ({ onPress }) => (
  <Wrapper onPress={onPress}>
    <CheckMark>✓</CheckMark>
  </Wrapper>
);

export default CompletionBadge;
