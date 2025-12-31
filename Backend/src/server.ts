import { RegistrationRoute } from './modules/Registration/registration.route';

import express, { Request, Response } from 'express';
import { connectDB } from './Database/db';

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://registration-from-pink.vercel.app" }));

connectDB();

app.use('/',RegistrationRoute)



app.get('/', (req : Request , res: Response) => {
    res.status(200).json({
        message : 'This is root route'
    })
})



app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})