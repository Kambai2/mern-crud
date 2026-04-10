import User from '../models/User.js';

export const create = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = new User({ name, email, address });
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
    return res.status(201).json({ message: 'User created', data: savedUser });
  } catch (err) {
    console.error('Error saving user:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'Users retrieved', data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User retrieved', data: user });
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted', data: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export const updateAddressField = async (req, res) => {
  try {
    const result = await User.updateMany(
      { address: { $exists: false } },
      { $set: { address: '' } }
    );
    return res.status(200).json({ 
      message: 'Address field added to existing records', 
      modifiedCount: result.modifiedCount 
    });
  } catch (err) {
    console.error('Error updating records:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export default { create, getAll, getById, deleteById, updateAddressField };
