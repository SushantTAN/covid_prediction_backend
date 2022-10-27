const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const uri = process.env.DB_CONNECT;
const port = process.env.PORT || 5000;



mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
    .then(() => console.log("connected to mongo db"))
    .catch(err => console.log(err));

//middleware
app.use(express.json());

const corsOptions = {
    exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions));

//Import routes
const authRoute = require('./routes/auth');
const entryRoute = require('./routes/entry');

//Route middleware
app.use('/api/auth', authRoute);
app.use('/api/entry', entryRoute);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});