import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import usersRouter from './routes/userRouter.js';
import seriesRouter from './routes/serieRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


//const MONGO_URI = 'mongodb://127.0.0.1:27017/recuperacion';
const MongoURL = process.env.MongoURL ||'mongodb+srv://notes-rest-api:notesDSI@cluster0.rypap0v.mongodb.net/recuperacion'

connect(MongoURL).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unable to connect to MongoDB server');
});

app.use('/users', usersRouter);
app.use('/series', seriesRouter);

app.use('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;