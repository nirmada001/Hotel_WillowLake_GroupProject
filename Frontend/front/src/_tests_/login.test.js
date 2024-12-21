// Login.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Login from "../../src/pages/login";
import { BrowserRouter as Router } from "react-router-dom";

const mock = new MockAdapter(axios);

// Mock function for updating login status
const mockUpdateLoginStatus = jest.fn();

test("should display success alert on successful login", async () => {
    mock.onPost("http://localhost:3001/login").reply(200, "success");

    render(
        <Router>
            <Login updateLoginStatus={mockUpdateLoginStatus} />
        </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Username/i), {
        target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "1234" },
    });
    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
        expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });
});

test("should display error alert on failed login", async () => {
    mock.onPost("http://localhost:3001/login").reply(400);

    render(
        <Router>
            <Login updateLoginStatus={mockUpdateLoginStatus} />
        </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Username/i), {
        target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
        expect(screen.getByText(/Login failed. Please check your credentials./i)).toBeInTheDocument();
    });
});

test("should show loading modal during login", async () => {
    mock.onPost("http://localhost:3001/login").reply(200, "success");

    render(
        <Router>
            <Login updateLoginStatus={mockUpdateLoginStatus} />
        </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Username/i), {
        target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "1234" },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();
});
