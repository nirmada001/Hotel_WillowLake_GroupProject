import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Signup from "../../pages/Signup/Signup";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("Signup Component", () => {
    test("renders Signup component and submits form successfully", async () => {
        axios.post.mockResolvedValue({ data: { success: true } });

        render(<Signup />);

        // Check if the form and initial UI elements are present
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ex: Jhon")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ex: Anderson")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Jhon@mail.com")
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Enter Username")
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Enter password")
        ).toBeInTheDocument();

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText("Ex: Jhon"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByPlaceholderText("Ex: Anderson"), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Jhon@mail.com"), {
            target: { value: "john.doe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
            target: { value: "john_doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByText("Sign Up"));

        // Wait for the modal to appear and check its content
        await waitFor(() => {
            expect(screen.getByText("Signup Successful")).toBeInTheDocument();
            expect(
                screen.getByText("Your account has been created successfully!")
            ).toBeInTheDocument();
        });
    });

    test("shows existing user modal on error", async () => {
        axios.post.mockRejectedValue({
            response: { status: 409 },
        });

        render(<Signup />);

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText("Ex: Jhon"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByPlaceholderText("Ex: Anderson"), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Jhon@mail.com"), {
            target: { value: "john.doe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
            target: { value: "john_doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByText("Sign Up"));

        // Wait for the modal to appear and check its content
        await waitFor(() => {
            expect(screen.getByText("Existing User")).toBeInTheDocument();
            expect(
                screen.getByText("This username is already in use.")
            ).toBeInTheDocument();
        });
    });

    test("handles form submission errors gracefully", async () => {
        axios.post.mockRejectedValue(new Error("Network Error"));

        render(<Signup />);

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText("Ex: Jhon"), {
            target: { value: "John" },
        });
        fireEvent.change(screen.getByPlaceholderText("Ex: Anderson"), {
            target: { value: "Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Jhon@mail.com"), {
            target: { value: "john.doe@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
            target: { value: "john_doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByText("Sign Up"));

        // Check if the modal appears and contains appropriate content
        await waitFor(() => {
            expect(screen.getByText("Signup Successful")).toBeInTheDocument();
            expect(
                screen.getByText("Your account has been created successfully!")
            ).toBeInTheDocument();
        });
    });

    test("handles form validation for empty fields", () => {
        render(<Signup />);

        // Try to submit the form without filling out any fields
        fireEvent.click(screen.getByText("Sign Up"));

        // Validate that the form does not proceed with empty fields
        expect(screen.queryByText("Signup Successful")).not.toBeInTheDocument();
        expect(screen.queryByText("Existing User")).not.toBeInTheDocument();
    });
});
