import React, { FunctionComponent } from "react";
import styled from "styled-components";
import theme from "../../../theme";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: auto 32px;
`;

const BoldText = styled.label`
  font-weight: bold;
  color: ${theme.palette.darkText};
  margin: 4px;
  min-width: 80px;
`;

const LighterText = styled.label`
  fontweight: 500;
  color: ${theme.palette.darkText};
  margin: 4px;
  text-align: start;
  display: block;
`;

const Attribute: FunctionComponent<Props> = ({ title, value }) => {
  return (
    <Wrapper>
      <BoldText>{title}</BoldText>
      <LighterText>{value}</LighterText>
    </Wrapper>
  );
};

type Props = {
  title: string;
  value: string;
};

export default Attribute;
