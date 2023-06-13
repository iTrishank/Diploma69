import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import "@testing-library/jest-dom/extend-expect";

describe("Nav component", () => {
  test("renders logo and login button when user is not authenticated", () => {
    render(<Nav minimal={false} />);
    const logoElement = screen.getByAltText("noImg");
    expect(logoElement).toBeInTheDocument();

    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  test("disables login button when showModal is true", () => {
    render(<Nav minimal={false} showModal={true} />);
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeDisabled();
  });

  test("calls handleClick when login button is clicked", () => {
    const setShowModal = jest.fn();
    const setIsSignUp = jest.fn();

    render(
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={false}
        setIsSignUp={setIsSignUp}
      />
    );

    const loginButton = screen.getByText("Log In");
    fireEvent.click(loginButton);

    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setIsSignUp).toHaveBeenCalledTimes(1);
    expect(setIsSignUp).toHaveBeenCalledWith(false);
  });
});
