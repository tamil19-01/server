import express from "express";

const app = express();

app.use(express.json());

let todos = [];
let counter = 1;

app.get("/", (req, res) => {
  res.send("Hello from Server 2");
});
// get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});
// get single todo by id
app.get("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const foundTodo = todos.filter((todo) => todo.id == todoId);
  res.send(foundTodo);
});

// create todo
app.post("/todos", (req, res) => {
  const { todo } = req.body;
  todos.push({ todo, id: counter });
  counter++;
  res.status(201).send("Todo created successfully.");
});

// update todo
app.put("/todos/:todoId", (req, res) => {
  const todoId = Number(req.params.todoId);
  const { todo } = req.body;

  const index = todos.findIndex((t) => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index].todo = todo;

  res.json({
    message: "Todo updated successfully",
    updatedTodo: todos[index],
  });
});

// delete todo
app.delete("/todos/:todoId", (req, res) => {
  const todoId = Number(req.params.todoId);

  const index = todos.findIndex((t) => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1);

  res.json({
    message: "Todo deleted successfully",
    deletedTodo: deletedTodo[0],
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
