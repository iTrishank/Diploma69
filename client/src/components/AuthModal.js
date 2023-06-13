import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import AuthModal from "./AuthModal";

jest.mock("axios");

describe("AuthModal", () => {
  test("handleSubmit - Successful login", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        token: "mockAuthToken",
        userId: "mockUserId",
      },
    });

    const { getByLabelText, getByText } = render(
      <AuthModal setShowModal={() => {}} isSignUp={false} />
    );

    fireEvent.change(getByLabelText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(getByText("Submit"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert the desired behavior based on the mock response
    // ...

    // You can also assert that the navigation occurred
    // For example, if the login was successful, it should navigate to "/dashboard"
    // expect(navigate).toHaveBeenCalledWith("/dashboard");
  });
});
