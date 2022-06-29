import React from "react";
import { render } from "@testing-library/react";
import NoPoster from ".";

describe("NoPoster tests", () => {
  it("should match snapshot", () => {
    const { container: component } = render(<NoPoster />);
    expect(component).toMatchSnapshot();
  });
});
