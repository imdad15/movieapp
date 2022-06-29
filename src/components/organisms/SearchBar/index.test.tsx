import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchBar from ".";

describe("SearchBar tests", () => {
  it("should match snapshot", () => {
    const { container: component } = render(<SearchBar onSearch={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });

  it("should callback onSearch with input", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByLabelText("search-movie");
    fireEvent.change(input, { target: { value: "movie" } });
    fireEvent.submit(input);
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith("movie");
    });
  });
});
