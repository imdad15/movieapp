import React from "react";
import { render } from "@testing-library/react";
import Loading from ".";

describe("Loading tests", () => {
  it("should match snapshot for loader", () => {
    const { container: component } = render(<Loading />);
    expect(component).toMatchSnapshot();
  });
});
