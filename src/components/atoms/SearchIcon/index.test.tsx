import React from "react";
import { render } from "@testing-library/react";
import SearchIcon from ".";

describe("Search icon tests", () => {
  it("should match snapshot", () => {
    const { container: component } = render(<SearchIcon />);
    expect(component).toMatchSnapshot();
  });
});
