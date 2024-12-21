const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server.js"); 
const SignupModel = require("../models/signupmodel");

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://test:test123@cluster0.yz6odl0.mongodb.net/innovatex?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe("User Sign Up and Authentication", () => {
    it("should create a new user", async () => {
        const response = await request(app).post("/signup").send({
            username: "testuser",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
            "message",
            "User added successfully"
        );
    });

    it("should not create a user with an existing username", async () => {
        const response = await request(app).post("/signup").send({
            username: "testuser",
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            password: "password123",
        });
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty(
            "error",
            "Username already exists."
        );
    });

    it("should login a user with correct credentials", async () => {
        const response = await request(app).post("/login").send({
            username: "testuser",
            password: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.text).toBe("success");
    });

    it("should not login a user with incorrect credentials", async () => {
        const response = await request(app).post("/login").send({
            username: "testuser",
            password: "wrongpassword",
        });
    expect(response.status).toBe(200);
    expect(response.text).toBe("failure");
    });
});
