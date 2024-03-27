// Import library
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose';
import router from './src/routers/index.js'
import dotenv from 'dotenv'
dotenv.config()

// konfigurasi app
const app = express();
const port = 5000;
// konfigurasi database
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(morgan('dev'));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})