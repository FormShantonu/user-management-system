import request from "supertest";
import app from "../app.js";
import jwt from "jsonwebtoken";


// Generate a valid JWT token for testing
const adminToken = jwt.sign(
  { id: 1, email: "admin@example.com", role: "admin" }, // Ensure role is "admin"
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
const userToken = jwt.sign(
  { id: 2, email: "user@example.com", role: "user" }, // Normal user (non-admin)
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
// ✅ Test: GET /api/users (Fetch All Users)
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
    expect(response.body).toHaveProperty(
      "message",
      "Access Denied: No Token Provided"
    );
  });
});
// ✅ Test: POST /api/users (Create User)
describe("POST /api/users", () => {
  let createdUserId;
  it("should create a new user when admin", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      });
    console.log(response.body); // Add this line before expect()
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
    // Step 3: Store the user ID for cleanup
    createdUserId = response.body.id;
  });
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "missing-fields@example.com" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it("should return 403 if a non-admin tries to create a user", async () => {
    // Generate a user token
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Unauthorized User",
        email: "unauthorized@example.com",
        password: "password123",
        role: "admin",
      });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Access Denied: Admins Only"
    );
  });
  afterAll(async () => {
    if (createdUserId) {
      console.log("Deleting user with ID:", createdUserId);
      await request(app)
        .delete(`/api/users/${createdUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);
    }
  });
});
