const express = require('express')
const { Users } = require('./schema');
const router = express.Router();
const cors = require("cors")
router.use(cors());


router.post('/insertUser', async (req, res) => {
  try { 
    const User = new Users(req.body)
    await User.save();
    res.status(201).json({ message: 'Success',data:User });
  } catch (error) {
    console.log('Error inserting data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.get("/getAllUserData", async (req, res) => {
  try {
    const find_all = await Users.find()
    res.status(200).json(find_all);
  } catch (error) {
    res.status(500).json({ message: "Failed" }); 
  } 
});

router.get('/getOneUser', async (req, res) => {
  try {
    const find_one = await Users.findOne(req.query); 
    if (!find_one) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({  message: 'Success' ,data: find_one });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});


router.put('/updateData', async (req, res) => {
  try {
    console.log(req.body,req.query)
    const updates = req.body; 
    const update = { $set: updates };
    const updatedData = await Users.findOneAndUpdate(req.query, update, { new: true });
    if (updatedData) {
      res.status(200).json({ message: 'Success', data : updatedData });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log('Error updating data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.delete('/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLogin = await Login.findByIdAndDelete(id);
    if (deletedLogin) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log('Error deleting data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.get('/getUsersByQuery', async (req, res) => {
  try {
    const query = req.query; // Assuming the query parameters are passed in the URL query string 
    const users = await Users.find(query);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    
    res.json({ message: 'Success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});





module.exports = router;