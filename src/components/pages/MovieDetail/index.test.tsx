import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import MovieDetail from ".";
import { getMovieDetail } from "../../../api";
import { useParams } from "react-router-dom";

jest.mock("../../../api");
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("Movie Detail tests", () => {
  it("should render the Movie Detail page", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "id123" });
    (getMovieDetail as jest.Mock).mockResolvedValueOnce({
      actors: "Bene dict , Elizabeth Ejiofor",
      awards: "N/A",
      country: "United States",
      director: "Sammi",
      genre: "Action, Adventure, Fantasy",
      language: "English",
      plot: "Doctor teams up with a mysterious girl who can travel across multiverses, to battle multiple threats, including other-universe versions of himself.",
      poster: "https://m.media.com/images/kEyXkFqcGdeQXVyMTM.jpg",
      released: "06 May 2022",
      runtime: "126 min",
      title: "Doctor of Madness",
      writer: "Michael Walden",
      year: "2022",
      imdbRating: "7.9",
      imdbVotes: "206,950",
    });
    render(<MovieDetail />);
    expect(getMovieDetail).toHaveBeenCalledTimes(1);
    // await here to wait for re-render
    expect(await screen.findByText("Sammi")).toBeDefined();
    expect(screen.getByText("06 May 2022")).toBeDefined();
    expect(screen.getByText("Action, Adventure, Fantasy")).toBeDefined();
  });
});
