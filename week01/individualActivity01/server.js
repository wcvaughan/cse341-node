require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Define a schema & model (Example)
const DataSchema = new mongoose.Schema({
    name: String,
    value: Number
});

const DataModel = mongoose.model('Data', DataSchema);

// GET route to fetch all data for frontend
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const professionalData = {
    professionalName: "John Doe",
    professionalImage: "https://via.placeholder.com/150",
    nameLink: "https://example.com",
    primaryDescription: "Full Stack Developer",
    workDescription1: "Experienced in Javascript, Node.js, and modern web frameworks. ",
    workDescription2: "Passionate about building scalable web applications.",
    linkTitleText: "Connect with me:",
    linkedInLink: "https://linkedin.com/in/johndoe",
    githubLink: "https://github.com/johndoe",
    contactText: "reach out via LinkedIn or Github."
};

app.get('/api/data', (req, res) => {
    res.json(professionalData);
});
