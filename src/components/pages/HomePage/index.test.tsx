import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import HomePage, { MovieResp } from ".";
import { getMovies } from "../../../api";
import { useNavigate } from "react-router-dom";

jest.mock("../../../api");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Home Page tests", () => {
  const useNavigateMock = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => useNavigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the Home Page with Message and search bar", async () => {
    render(<HomePage />);
    expect(getMovies).toHaveBeenCalledTimes(0);
    expect(
      screen.getByText("Search something at the top(min. 3 chars)")
    ).toBeDefined();
    expect(screen.getByPlaceholderText("Search for a movie...")).toBeDefined();
  });

  it("should render search results and navigate on click", async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce({
      Search: [
        {
          Poster: "https://m.media.com/images/M/MV5BL.jpg",
          Title: "Spider-Man",
          imdbID: "tt009",
        },
        {
          Poster: "https://m.media.com/images/M/MNDg1Y.jpg",
          Title: "Home Alone",
          imdbID: "tt0099785",
        },
      ],
      totalResults: 2,
    }) as unknown as MovieResp;

    render(<HomePage />);
    expect(
      screen.getByText("Search something at the top(min. 3 chars)")
    ).toBeDefined();

    const input = screen.getByLabelText("search-movie");
    fireEvent.change(input, { target: { value: "home" } });
    fireEvent.submit(input);
    await act(async () => {
      expect(getMovies).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText("Home Alone")).toBeDefined();
    const clickMovie = screen.getByText("Spider-Man");
    fireEvent.click(clickMovie);
    expect(useNavigateMock).toHaveBeenCalledWith("/movie/tt009");
  });
});
