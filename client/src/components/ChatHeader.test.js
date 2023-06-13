import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));

describe("ChatHeader component", () => {
  test("calls logout function and navigates to '/' when logout icon is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const user = { url: "profile.jpg", first_name: "John" };
    render(<ChatHeader user={user} />);
    const logoutIcon = screen.getByText("Logout");
    fireEvent.click(logoutIcon);
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
