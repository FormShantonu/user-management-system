import request from "supertest";
import app from "../app.js";
import { pool, resetDatabase } from "./testDatabase.js";
import jwt from "jsonwebtoken";
import './testDatabase.js';


let adminToken, userToken;

beforeAll(async () => {
  // Reset DB before starting tests
  await resetDatabase();

  // Insert a test admin user
  await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["Admin", "admin@example.com", "hashedpassword", "admin"]
  );

  // Insert a test normal user
  await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["User", "user@example.com", "hashedpassword", "user"]
  );

  // Generate JWT tokens for testing
  adminToken = jwt.sign(
    { email: "admin@example.com", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  userToken = jwt.sign(
    { email: "user@example.com", role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await pool.end(); // Close DB connection
});

describe("GET /api/users", () => {
  it("should return a list of users when authenticated", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(401);
  });
});

describe("POST /api/users", () => {
  it("should create a new user when admin", async () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      role: "user",
    };

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
  });

  it("should return 403 if a non-admin tries to create a user", async () => {
    const newUser = {
      name: "Fake Admin",
      email: "fakeadmin@example.com",
      password: "password123",
      role: "admin",
    };

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send(newUser);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Access Denied: Admins Only"
    );
  });
});
