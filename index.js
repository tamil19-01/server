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
  const newTodo = req.body.todo;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].todo = newTodo;
      return res.send("Todo updated successfully");
    }
  }

  res.status(404).send("Todo not found");
});


// delete todo
app.delete("/todos/:todoId", (req, res) => {
  const todoId = Number(req.params.todoId);

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos.splice(i, 1);
      return res.send("Todo deleted successfully");
    }
  }

  res.status(404).send("Todo not found");
});


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
