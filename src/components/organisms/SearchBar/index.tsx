import React, { FunctionComponent, useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import SearchIcon from "../../atoms/SearchIcon";

const SearchWrapper = styled.form`
  padding: 16px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px ${theme.palette.shadow};
  background-color: ${theme.palette.primary};
  cursor: auto;
  &:input:focus {
    outline: none;
    box-shadow: 0px 0px 2px red;
    cursor: pointer;
  }
`;

const Input = styled.input`
  font-size: 18px;
  background-color: transparent;
  width: 100%;
  margin-left: 16px;
  border: none;
  color: ${theme.palette.text};

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: ${theme.palette.text};
  }
`;

const SearchBar: FunctionComponent<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const inputFocus = useRef<HTMLInputElement>(null);

  return (
    <div>
      <SearchWrapper
        onClick={() => {
          inputFocus.current!.focus();
        }}
        onFocus={() => {
          inputFocus.current!.focus();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(input);
        }}
      >
        <SearchIcon />
        <Input
          aria-label="search-movie"
          onChange={(e) => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          placeholder="Search for a movie..."
        />
      </SearchWrapper>
    </div>
  );
};

type Props = {
  onSearch: (searchText?: string) => void;
};

export default SearchBar;
