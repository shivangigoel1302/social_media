const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();

//load env variable


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

//bring in routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//middleware 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use('/',postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function(err,req,res,next){
	if(err.name === 'UnauthorizedError'){
		res.status(401).json({error: 'login required'});
	}
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log(`A node js api is listening on port ${port}`)});