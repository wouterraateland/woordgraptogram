import React from "react";
import styled from "styled-components";

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  top: 32px;
  left: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  border: 1px solid #0002;

  border-radius: 24px;
  box-shadow: 0 2px 6px #0004;

  background-color: #fff;
`;

const Number = styled.Text`
  font-weight: bold;
  font-size: 32px;
  line-height: 28px;
`;

const BackButton = ({ onPress }) => (
  <Wrapper onPress={onPress}>
    <Number>&larr;</Number>
  </Wrapper>
);

export default BackButton;
