import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "../api/routes/user.route.js"
import userAuth from "../api/routes/auth.route.js"
import userListing from "../api/routes/listing.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";




dotenv.config();

app.use(cors({
  origin: process.env.CLIENT_URL, // Allow frontend URL
  credentials: true, // Allow cookies
}));

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongoDB!!');
    
}).catch((err)=>{
    console.log(err);
    
})
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());


// app.get('/test', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/user',userRouter);
app.use('/api/auth',userAuth);
app.use('/api/listing',userListing);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  // next(err)
  return res.status(statusCode).json(
    {
      success:false,
      statusCode,
      message
       
    }
  );
})
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error234';
  return res.status(statusCode).json(
    {
      success:false,
      statusCode,
      message:"trewertyuklkjuytr"
       
    }
  );
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port} !!`)
})
