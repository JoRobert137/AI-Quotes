const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const geminiRouter = require('./routes/geminiAPI')

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', geminiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});