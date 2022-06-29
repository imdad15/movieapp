import React from "react";
import { render, screen } from "@testing-library/react";
import Attribute from ".";

describe("Search icon tests", () => {
  it("should match snapshot", () => {
    const { container: component } = render(
      <Attribute title="some title" value="some value" />
    );
    expect(component).toMatchSnapshot();
  });

  it("should render the Attribute component with props", () => {
    render(<Attribute title="some title" value="some value" />);
    expect(screen.getByText("some title")).toBeDefined();
    expect(screen.getByText("some value")).toBeDefined();
  });
});
