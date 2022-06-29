import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import theme from "../../../theme";
import NoPoster from "../../atoms/NoPoster";

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 12px;
  position: relative;
  &:hover {
    transform: scale(1.03);
    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    z-index: -99;
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: 360px;
  object-fit: contain;
  border-radius: 12px;
  ${MovieWrapper}:hover & {
    border-radius: 12px 12px 0 0;
    box-shadow: none;
  }
  ${theme.media.mobile} {
    height: 360px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: ${theme.palette.darkText};
  margin-bottom: 16px;
  line-height: 1.4;
`;

export const MovieCard: FunctionComponent<Props> = ({ id, title, poster }) => {
  let navigate = useNavigate();

  return (
    <MovieWrapper onClick={() => navigate(`/movie/${id}`)}>
      {!poster && <NoPoster />}
      {poster && <MovieImg src={`${poster}`} />}
      <Title>{title}</Title>
    </MovieWrapper>
  );
};

type Props = {
  id: string;
  title: string;
  poster: string;
};
