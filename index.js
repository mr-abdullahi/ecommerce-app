const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

const URI = process.env.DATABASE_URI
mongoose.connect(URI)
    .then(() => {console.log('Database connection successful')})
    .catch((err) =>{ console.log(err)})
        

app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use('/user', require('./routes/userRouter'))
app.use('/api/category', require('./routes/categoryRouter'))
app.use('/api/product', require('./routes/productRouter'))



app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port: 5000');
})