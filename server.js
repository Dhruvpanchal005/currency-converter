const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/authDB";

let db;
let usersCollection;
let contactCollection;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Connect MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db();
    usersCollection = db.collection("users");
    contactCollection = db.collection("contacts");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
}

connectDB();

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    await usersCollection.insertOne({ name, email, password });

    res.json({ success: true, message: "Registration Successful" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email, password });

    if (user) {
      res.json({
        success: true,
        user: { name: user.name, email: user.email },
      });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ================= CONTACT =================
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await contactCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.json({ success: true, message: "Message Sent Successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
