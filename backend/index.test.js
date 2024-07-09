const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

// Connect to a test database
beforeAll(async () => {
  const url = process.env.MONGO_TEST_URL || "mongodb://localhost/todolist_test";

  console.log(url);
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database before each test
beforeEach(async () => {
  await Todo.deleteMany();
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Tests
describe("Todo API", () => {
  it("should create a new todo", async () => {
    const response = await request(app).post("/todos").send({
      text: "Test todo",
    });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe("Test todo");
    expect(response.body.completed).toBe(false);
  });

  it("should fetch all todos", async () => {
    const todo = new Todo({
      text: "Test todo",
      completed: false,
    });
    await todo.save();

    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].text).toBe("Test todo");
  });

  it("should update a todo", async () => {
    const todo = new Todo({
      text: "Test todo",
      completed: false,
    });
    await todo.save();

    const response = await request(app).put(`/todos/${todo._id}`).send({
      text: "Updated todo",
      completed: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe("Updated todo");
    expect(response.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const todo = new Todo({
      text: "Test todo",
      completed: false,
    });
    await todo.save();

    const response = await request(app).delete(`/todos/${todo._id}`);
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("Test todo");
  });
});
