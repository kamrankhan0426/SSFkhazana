const express = require('express')
const { Users ,coins, transaction } = require('./schema');
const router = express.Router();
const cors = require("cors")
router.use(cors());
const nodemailer = require("nodemailer");


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
 
router.put('/updateManyData', async (req, res) => {
  try {
    const updates = req.body;
    const promises = updates.map(async (update) => {
      const filter = { email: update.filter }; // Assuming email is the field to filter on
      const values = update.values;
      console.log(updates)
      const updateQuery = { $set: values };
      const result = await Users.updateMany(filter, updateQuery);
      return result.nModified;
    });
    const results = await Promise.all(promises);
    const totalCount = results.reduce((acc, count) => acc + count, 0);   
     res.status(404).json({ message: 'Success' });
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

router.get('/getAllUser', async (req, res) => {
  try {
    const users = await Users.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json({ message: 'Success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});





router.get("/getAllCoin", async (req, res) => {
  try {
    const find_all = await coins.find()
    res.status(200).json(find_all);
  } catch (error) {
    res.status(500).json({ message: "Failed" }); 
  } 
}); 

router.get('/getOneCoin', async (req, res) => {
  try {
    const find_one = await coins.findOne(req.query);  
    if (!find_one) { 
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({  message: 'Success' ,data: find_one });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Failed' });
  }
});

router.post('/insertCoinPrice', async (req, res) => {
  try { 
    console.log(req.body)
    const coin = new coins(req.body)
    await coin.save();
    res.status(201).json({ message: 'Success',data:coin });
  } catch (error) {
    console.log('Error inserting data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.put('/updateCoin', async (req, res) => {
  try {
    const updates = req.body; 
    const update = { $set: updates };
    const updatedData = await coins.findOneAndUpdate(req.query, update, { new: true });
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





router.put('/updateTransaction', async (req, res) => {
  try {
    const updates = req.body; 
    const update = { $set: updates };
    console.log(updates)
    console.log(update)
    const updatedData = await transaction.findOneAndUpdate(req.query, update, { new: true });
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


router.get('/getAllTransaction', async (req, res) => {
  console.log('Called')
  try {
    const users = await transaction.find();    
    console.log(users.length)
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }    
    res.json({ message: 'Success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});





router.post('/addTranscations', async (req, res) => {
  try {
    const tras = new transaction(req.body)
    var resp =  await tras.save();
    if (resp) {
      res.status(200).json({ message: 'Success', data : resp });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log('Error updating data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.patch('/updateTransact', async (req, res) => {
  console.log('Called')
  try {
    const updates = req.body; 
    const updatedData = await transaction.findOneAndUpdate(req.query, updates, { new: true });
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

router.get('/getTransactions', async (req, res) => {
  try {
    const users = await transaction.find();    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }    
    res.json({ message: 'Success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});






router.post("/sendUserCLientId", async (req, res) => {
  console.log("Called");
  console.log("inside routes");
  const { email ,client_Id } = req.body;
  console.log("email is ", email);

  try {
     
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {   
        user: "propertyportalcc@gmail.com",
        pass: "xwrrfzmrdowxnamf",
      },
    });

    const mailOptions = {
      from: "propertyportalcc@gmail.com",
      to: email,
      subject: "Code-No ( Client Id ) ",
      html: `<div style="font-family: Helvetica, Arial, sans-serif; overflow: auto; line-height: 2">
        <div style="margin: 5px auto; width: 90%; padding: 20px 0">
          <div style="border-bottom: 1px solid #eee">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">SSF Khazana</a>
          </div>
          <p style="font-size: 1.1em">Hi,</p>
          <p>Thank you for choosing SSF Khazana.<br/> Use the following Code-No ( Client Id ) to complete your Sign In procedures.</p>
          <h2 style="background: #00466a; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">Client Id:-  ${client_Id}</h2>
          <p style="font-size: 0.9em;">Regards,<br />SSF Khazana Team</p>
        </div>
      </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(201).json({ status: 201, info });
  } catch (error) {
    console.log("Error:", error);
    res.status(401).json({ status: 401, error });
  }
});

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

router.post('/sendVerificationCode', async (req, res) => {
  const { email } = req.body;
  console.log(req.body)
  try {
    // Generate a random 6-digit verification code
    const verificationCode = generateVerificationCode();
    console.log(verificationCode)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {   
        user: "propertyportalcc@gmail.com",
        pass: "xwrrfzmrdowxnamf",
      },
    });

    const mailOptions = {
      from: 'propertyportalcc@gmail.com', // Update with your Gmail email
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    // Send the email with the verification code
    const info = await transporter.sendMail(mailOptions);

    console.log('Verification Code Email Sent:', info.response);

    res.status(201).json({ status: 201, verificationCode });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
});

module.exports = router;