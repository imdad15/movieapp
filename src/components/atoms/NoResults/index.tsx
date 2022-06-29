import React, { FunctionComponent } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import { MESSAGE } from "../../../utils/enum";

const LargeText = styled.h2`
  color: ${theme.palette.darkText};
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 100px;
  margin-bottom: 16px;
  font-size: 36px;
  text-align: center;
  ${theme.media.mobile} {
    font-size: 24px;
    margin: 16px;
  }
`;

const NoResults: FunctionComponent<Props> = ({ text }) => {
  return (
    <div>
      <LargeText>{text}</LargeText>
    </div>
  );
};

type Props = {
  text: MESSAGE;
};

export default NoResults;
