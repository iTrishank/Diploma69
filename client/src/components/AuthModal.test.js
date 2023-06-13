import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AuthModal from "./AuthModal";

describe("AuthModal", () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  test("handleSubmit - Successful login", async () => {
    // Mock the HTTP request and response
    const mockResponse = {
      status: 200,
      data: {
        token: "mockAuthToken",
        userId: "mockUserId",
      },
    };
    axiosMock.onPost("http://localhost:8000/login").reply(200, mockResponse);

    // Render the component
    const { getByLabelText, getByText } = render(<AuthModal />);

    // Fill in the form fields
    fireEvent.change(getByLabelText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByText("Submit"));

    // Wait for the login process to complete
    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    // Assert the desired behavior based on the mock response
    expect(document.cookie).toBe("AuthToken=mockAuthToken; path=/");
    expect(document.cookie).toBe("UserId=mockUserId; path=/");
    // ...assert other expected behaviors
  });

  test("handleSubmit - Unsuccessful login", async () => {
    // Mock the HTTP request and response
    const mockErrorResponse = {
      status: 401,
      data: {
        message: "Invalid credentials",
      },
    };
    axiosMock
      .onPost("http://localhost:8000/login")
      .reply(401, mockErrorResponse);

    // Render the component
    const { getByLabelText, getByText } = render(<AuthModal />);

    // Fill in the form fields
    fireEvent.change(getByLabelText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByText("Submit"));

    // Wait for the login process to complete
    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    // Assert the desired behavior based on the mock response
    expect(document.cookie).toBe("");
    // ...assert other expected behaviors
  });
});
