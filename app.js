const express = require('express');
const app = express();
const morgan = require("morgan");

//bring in routes
const postRoutes = require('./routes/posts');
const bodyParser = require('body-parser');
//load env variable
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const expressValidator = require('express-validator');

//db connection
// mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});
// const myOwnMiddleware = (req,res,next)=>{
// 	console.log("middleware applied");
// 	next();
// };

//middleware 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/',postRoutes);

const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log(`A node js api is listening on port ${port}`)});