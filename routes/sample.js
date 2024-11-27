const db = require('../database');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../controller/authController');

// Sample route
router.get('/sample', (req, res) => {
  res.status(200).json({ message: 'This is a sample message' });
});

// Authentication Token
router.get('/auth/token', (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, 'shhhhh', { expiresIn: 60 * 60 });
  res.status(200).json({ message: 'success', token });
});

// Get all users
router.get('/users/getAllUsers',auth.auth, (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).send(results);
  });
});

// Get a user by ID
router.get('/users/getUser/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).json({success:true,results:results});
  });
});

// Create a new user
router.post('/users/createUser', (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    return res.status(400).send({ error: 'Name, email, and mobile are required' });
  }
  const query = 'INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)';
  db.query(query, [name, email, mobile], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      id: result.insertId,
    });
  });
});

// Update a user
router.post('/users/updateUser', (req, res) => {
  const { id, name, email, mobile } = req.body;
  if (!id || !name || !email || !mobile) {
    return res.status(400).send({ error: 'ID, name, email, and mobile are required' });
  }
  const query = 'UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?';
  db.query(query, [name, email, mobile, id], (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  });
});

module.exports = router;
