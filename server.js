const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
require('dotenv').config();


app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.set("view engine", "ejs")


const user = require('./routes/user');
const discount = require('./routes/discount');
const category = require('./routes/category');
const subCategory = require('./routes/subCategory');
const product = require('./routes/product');
const invoice = require('./routes/invoice');

app.use('/api', user);
app.use('/api', discount);
app.use('/api', category);
app.use('/api', subCategory);
app.use('/api', product);
app.use('/api', invoice);
app.get("/", (req, res) => res.render("home"));

app.listen(process.env.port || 3001);