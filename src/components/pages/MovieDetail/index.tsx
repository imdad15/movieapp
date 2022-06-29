import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail } from "../../../api";
import { MovieData } from "../../../modals/MovieData";
import theme from "../../../theme";
import Attribute from "../../molecules/Attribute";

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px;
  ${theme.media.mobile} {
    margin: 16px;
  }
`;

const Title = styled.h4`
  color: ${theme.palette.darkText};
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
  font-size: 36px;
  ${theme.media.mobile} {
    font-size: 24px;
    text-align: center;
    margin: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  width: 100%;
  margin: 16px 0;
  flex-direction: row;
  ${theme.media.mobile} {
    flex-direction: column;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 32px;
  ${theme.media.mobile} {
    align-items: start;
    padding: 10px 0;
  }
`;

const Poster = styled.img`
  max-height: 100%;
  height: 400px;
  object-fit: contain;
  max-width: 100%;
`;

const MovieDetail: FunctionComponent = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieData>();

  useEffect(() => {
    const movieData = async () => {
      if (id) {
        const movieDetails = await getMovieDetail(id);
        setMovie(movieDetails);
      }
    };
    movieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!movie) return <></>; //ToDo: Set loading or Error
  const {
    title,
    poster,
    genre,
    imdbRating,
    imdbVotes,
    released,
    writer,
    director,
    awards,
    actors,
    plot,
  } = movie;
  const ratingText = imdbRating
    ? imdbRating + (imdbVotes ? ` (${imdbVotes} Votes)` : "")
    : "";
  return (
    <DetailsWrapper>
      <Title>{title}</Title>
      <Section>
        <Poster src={poster} />
        <Information>
          <Attribute title={"Genre"} value={genre} />
          {ratingText && <Attribute title={"Rating"} value={ratingText} />}
          {released && <Attribute title={"Released"} value={released} />}
          {awards && <Attribute title={"Awards"} value={awards} />}
        </Information>
      </Section>
      <Attribute title={"Plot"} value={plot} />
      <Attribute title={"Actors"} value={actors} />
      <Attribute title={"Director"} value={director} />
      <Attribute title={"Writer"} value={writer} />
    </DetailsWrapper>
  );
};

export default MovieDetail;
