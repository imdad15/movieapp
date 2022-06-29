import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import MovieDetail from "./components/pages/MovieDetail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* <ErrorHandlerMiddleware> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* <Route path={NotFoundRoute()} exact={true} component={NotFound404Container} /> */}
          {/* <Route path={ErrorPage500Route()} exact={true} component={Error500Container} /> */}
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
