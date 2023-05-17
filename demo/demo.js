const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8801;
const secretKey = "paneerTikka";

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = require("./user.json").find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

app.get("/user/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected user route accessed successfully" });
});

// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: 'Forbidden' });
//     }

//     req.userId = decoded.id;
//     next();
//   });
// }

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.userId = decoded.id;

    const user = require("./user.json").find((u) => u.id === decoded.id);
    console.log(user);
    if (!user || !isAuthorized(user.role, req.path, req.method)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  });
}

function isAuthorized(role, path, method) {
  if (role === "admin" || path.startsWith("/user")) {
    return true;
  }

  return false;
}

app.post("/users", authenticateToken, authorizeAdmin, (req, res) => {
  const { username, password, role } = req.body;

  const existingUser = require("./user.json").find(
    (u) => u.username === username
  );
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    password: bcrypt.hashSync(password, 10),
    role: "user",
  };

  const users = require("./user.json");
  users.push(newUser);

  fs.writeFileSync("./user.json", JSON.stringify(users));

  res.json({ message: "User created successfully", user: newUser });
});

function authorizeAdmin(req, res, next) {
  const user = require("./user.json").find((u) => u.id === req.userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

app.put("/users/password", authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  const users = require("./user.json");
  const user = users.find((u) => u.id === userId);

  console.log("password", user);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  bcrypt.compare(currentPassword, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    user.password = bcrypt.hashSync(newPassword, 10);

    fs.writeFileSync("./user.json", JSON.stringify(users));

    res.json({ message: "Password updated successfully" });
  });
});

app.post("/signup", (req, res) => {
  const { username, password, role } = req.body;

  const users = require("./user.json");
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    password: bcrypt.hashSync(password, 10),
    role,
  };

  users.push(newUser);
  fs.writeFileSync("./user.json", JSON.stringify(users));

  const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: "1h" });

  res.json({ message: "User created successfully", token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
