const { db } = require('../config/firebaseConfig');

const ITEMS_COLLECTION = 'items'; // Firestore collection name

// Get all items
const getAllItems = async (req, res) => {
  try {
    const snapshot = await db.collection(ITEMS_COLLECTION).get();
    const items = [];
    snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const doc = await db.collection(ITEMS_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const newItem = req.body;
    const docRef = await db.collection(ITEMS_COLLECTION).add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    await db.collection(ITEMS_COLLECTION).doc(id).update(updatedData);
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection(ITEMS_COLLECTION).doc(id).delete();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};