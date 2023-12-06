"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = require("./config/databaseConfig");
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
// import { corsOptions } from './config/corsConfig';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// connect to database
(0, databaseConfig_1.connectDB)();
console.log(__dirname);
// middlewares
// app.use(express.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.resolve(__dirname, '../static/views'));
app.get('/', (req, res) => {
    res.send('main page');
    // res.render('home');
});
app.get('/test', (req, res) => {
    res.render('main');
});
app.use('/v1', routes_1.router);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
