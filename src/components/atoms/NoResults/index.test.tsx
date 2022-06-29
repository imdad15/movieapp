import React from "react";
import { render, screen } from "@testing-library/react";
import NoResults from ".";
import { MESSAGE } from "../../../utils/enum";

describe("Search icon tests", () => {
  it("should render the Attribute component with props", () => {
    render(<NoResults text={MESSAGE.NO_RESULT} />);
    expect(screen.getByText("No results found for your search")).toBeDefined();
  });
});
