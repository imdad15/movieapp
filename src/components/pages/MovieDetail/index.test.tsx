import React from "react";
import { render } from "@testing-library/react";
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
    render(<MovieDetail />);
    expect(getMovieDetail).toHaveBeenCalledTimes(1);
  });
});
