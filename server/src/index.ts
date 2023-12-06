require('dotenv').config();
import express, { Response, Request } from 'express';
import { connectDB } from './config/databaseConfig';
import { router } from './routes';
import path from 'path';
// import { corsOptions } from './config/corsConfig';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Update with your frontend's actual origin
  credentials: true,
};
app.use(cors(corsOptions));

// connect to database
connectDB();
console.log(__dirname);
// middlewares
// app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../static/views'));

app.get('/', (req: Request, res: Response) => {
  res.send('main page');
  // res.render('home');
});
app.get('/test', (req: Request, res: Response) => {
  res.render('main');
});

app.use('/v1', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
