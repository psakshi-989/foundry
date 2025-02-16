require('dotenv').config();
const uri = process.env.MONGO_URI;
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
console.log(uri);
// Serve static files from the 'public' directory
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(path.join(__dirname, 'products')));


//const uri = 'mongodb+srv://foundry:VgRZBS6ydszRHYZA@cluster0.atbz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log(err));
// Serve the index.html file
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNo: String,
    message: String
});
const FormSubmission = mongoose.model('FormSubmission', formSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/submit-form', async (req, res) => {
    const { name, email, contactNo, message } = req.body;
    const newSubmission = new FormSubmission({ name, email, contactNo, message });

    try {
        await newSubmission.save(); // Save the data to the database
        res.status(200).send('Form submitted successfully');
    } catch (error) {
        res.status(500).send('Error saving form data: ' + error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// org ID: 67639dff9809ce0884689db7
// Your current IP address (150.129.104.94) has been added to enable local connectivity
// Username: foundry
// Password: VgRZBS6ydszRHYZA
