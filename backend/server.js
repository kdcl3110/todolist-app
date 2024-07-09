require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/todolist";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});