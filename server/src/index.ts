require('dotenv').config();
import express, { Response, Request } from 'express';
import { connectDB } from './config/databaseConfig';
const app = express();

// connect to database
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('home page');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
