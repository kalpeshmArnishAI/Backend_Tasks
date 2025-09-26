// app.js
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const Employee = require("./model/user");

const app = express();
app.use(bodyParser.json());


// sequelize.sync({ alter: true })  // use { force: true } to drop and recreate table
//   .then(() => console.log("✅ Tables synced"))
//   .catch(err => console.error(" Error:", err));

// Routes
app.get('/welcome',(req,res)=>{
          res.send("Welcome to CURD Operation...!")
});

// create a single user
// app.post("/employees", async (req, res) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.json(employee);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// For Bulk Data Post
app.post("/employees/bulk", async (req, res) => {
  try {
    const employees = await Employee.bulkCreate(req.body);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// READ all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE employee
app.put("/employees/:id", async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const employee = await Employee.findByPk(req.params.id);
      return res.json(employee);
    }

    res.status(404).json({ error: "Employee not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => console.log("🚀 Server running on port 8000"));
