import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import theme from "../../../theme";
import NoPoster from "../../atoms/NoPoster";

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 12px;
  position: relative;
  &:hover {
    transform: scale(1.05);
    ::after {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: 360px;
  object-fit: contain;
  border-radius: 12px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: ${theme.palette.darkText};
  margin-bottom: 16px;
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
