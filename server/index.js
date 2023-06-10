import express from 'express'
import dotenv from "dotenv";
import colors from 'colors';
/*import session from 'express-session'*/
import cors from 'cors'
/*import  mongoose  from 'mongoose'*/
import bodyParser from 'body-parser'
/*import { Configuration, OpenAIApi } from "openai";*/
import connectDB from './config/connectDB.js'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import chatbotRoutes from "./routes/Chatbot.js";
import otpRoutes from './routes/Otp.js'



dotenv.config()
connectDB()

const PORTS = process.env.PORT || 5000


const app = express();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());



process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";



app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API by Darshana")
})

app.listen(PORTS, () => {
    console.log(`Server running on port ${PORTS}`.bgBlue.white)
  })

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use("/chatbot", chatbotRoutes)
app.use('/otp',otpRoutes)

app.use(bodyParser.json())

