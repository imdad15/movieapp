import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { getMovies } from "../../../api";
import theme from "../../../theme";
import { MESSAGE } from "../../../utils/enum";
import Loading from "../../atoms/Loading";
import { MovieCard } from "../../organisms/MovieCard/index";
import NoResults from "../../atoms/NoResults";
import SearchBar from "../../organisms/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";

const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;
  @media {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }
  ${theme.media.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
    grid-gap: 4rem 1rem;
  }
`;

export type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};

export type MovieResp = {
  Search: Movie[];
  totalResults: number;
  error: boolean;
};

const HomePage: FunctionComponent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noDataText, setNoDataText] = useState<MESSAGE | null>(
    MESSAGE.NO_SEARCH_INPUT
  );
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const loadMovies = async () => {
      if (searchText.length > 2) {
        const resp = (await getMovies(
          searchText,
          page
        )) as unknown as MovieResp;
        if (page === 1) {
          setData(resp.Search);
        } else {
          setData([...data, ...resp.Search]);
        }
        setCount(resp.totalResults);
      }
    };
    loadMovies();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  // set empty screen if search string is too short or no results
  useEffect(() => {
    if (!loading) {
      if (searchText.length > 2 && !data) {
        setNoDataText(MESSAGE.NO_RESULT);
        return;
      } else if (searchText.length < 3) {
        setNoDataText(MESSAGE.NO_SEARCH_INPUT);
        return;
      }
    }
    setNoDataText(null);
  }, [loading, searchText, data]);

  const onSearch = async (searchKeyword: string = "") => {
    setSearchText(searchKeyword);
    setPage(1);
    setLoading(true);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {!noDataText && (
        <InfiniteScroll
          dataLength={data.length}
          next={() => setPage(page + 1)}
          hasMore={Math.floor(count / (page * 10)) > 0}
          loader={<Loading />}
        >
          <MoviesWrapper>
            {data &&
              data.map((movieItem) => (
                <MovieCard
                  key={movieItem.imdbID}
                  title={movieItem.Title}
                  id={movieItem.imdbID}
                  poster={movieItem.Poster !== "N/A" ? movieItem.Poster : ""}
                />
              ))}
          </MoviesWrapper>
        </InfiniteScroll>
      )}

      {loading && <Loading />}
      {noDataText && <NoResults text={noDataText} />}
    </>
  );
};

export default HomePage;
