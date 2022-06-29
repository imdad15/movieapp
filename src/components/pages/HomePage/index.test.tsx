import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from ".";
import { getMovies } from "../../../api";

jest.mock("../../../api");

describe("Home Page tests", () => {
  it("should render the Home Page with Message and search bar", async () => {
    render(<HomePage />);
    expect(getMovies).toHaveBeenCalledTimes(0);
    expect(
      screen.getByText("Search something at the top(min. 3 chars)")
    ).toBeDefined();
    expect(screen.getByPlaceholderText("Search for a movie...")).toBeDefined();
  });

  it("should render the Home Page and render search results", async () => {
    (getMovies as jest.Mock).mockReturnValue([
      {
        Poster: "https://m.media.com/images/M/MV5BL.jpg",
        Title: "Spider-Man: No Way Home",
        imdbID: "tt009",
      },
      {
        Poster: "https://m.media.com/images/M/MNDg1Y.jpg",
        Title: "Home Alone",
        imdbID: "tt0099785",
      },
    ]);

    render(<HomePage />);
    expect(
      screen.getByText("Search something at the top(min. 3 chars)")
    ).toBeDefined();

    const input = screen.getByLabelText("search-movie");
    fireEvent.change(input, { target: { value: "home" } });
    fireEvent.submit(input);

    await waitFor(() => expect(getMovies).toHaveBeenCalledTimes(1));
  });
});
