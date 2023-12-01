require('dotenv').config();
import express, { Response, Request } from 'express';
import { connectDB } from './config/databaseConfig';
import { router } from './routes';
// import { corsOptions } from './config/corsConfig';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors());

// connect to database
connectDB();

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('home page');
});

app.use('/v1', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
