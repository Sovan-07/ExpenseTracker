import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from './config/db.js';
import userRouter from './routes/user.route.js';
import incomeRouter from './routes/income.route.js';

const app = express();
const port = process.env.PORT||4000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//DB
connectDb();

//Routes 
app.use('/api/user' , userRouter)
app.use('/api/income' , incomeRouter)

app.get('/' , (req,res)=>{
    res.send("Api working")
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port} : `);
    
})