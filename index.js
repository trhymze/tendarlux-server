// import express from "express";
// import cors from "cors";
// import { Low } from "lowdb";
// import { JSONFile } from "lowdb/node";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const file = path.join(__dirname, "db.json");

// const adapter = new JSONFile(file);
// const db = new Low(adapter);

// await db.read();
// if (!db.data) {
//   db.data = { tasks: [], notes: [] };
//   await db.write(); // write defaults immediately
// }

// app.get("/tasks", async (_, res) => {
//   await db.read();
//   res.json(db.data.tasks);
// });

// app.post("/tasks", async (req, res) => {
//   const newTask = { id: Date.now(), ...req.body };
//   db.data.tasks.push(newTask);
//   await db.write();
//   res.status(201).json(newTask);
// });

// app.get("/notes", async (_, res) => {
//   await db.read();
//   res.json(db.data.notes);
// });

// app.post("/notes", async (req, res) => {
//   const newNote = { id: Date.now(), ...req.body };
//   db.data.notes.push(newNote);
//   await db.write();
//   res.status(201).json(newNote);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, "db.json");

const adapter = new JSONFile(file);
const defaultData = { tasks: [], notes: [] }; // Define default data
const db = new Low(adapter, defaultData); // Pass default data to Low

// Initialize the database
await db.read();
await db.write();
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tendmin-app API" });
});

app.get("/tasks", async (_, res) => {
  await db.read();
  res.json(db.data.tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  db.data.tasks.push(newTask);
  await db.write();
  res.status(201).json(newTask);
});

app.get("/notes", async (_, res) => {
  await db.read();
  res.json(db.data.notes);
});

app.post("/notes", async (req, res) => {
  const newNote = { id: Date.now(), ...req.body };
  db.data.notes.push(newNote);
  await db.write();
  res.status(201).json(newNote);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
