import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieCard } from ".";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Search icon tests", () => {
  beforeEach(() => {
    useNavigate as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container: component } = render(
      <MovieCard id={"asc123"} title={"New Movie"} poster={"PosterUrl"} />
    );
    expect(component).toMatchSnapshot();
  });

  it("should render the Movie card component with props", () => {
    render(
      <MovieCard id={"asc123"} title={"New Movie"} poster={"PosterUrl"} />
    );
    expect(screen.getByText("New Movie")).toBeDefined();
  });
});
