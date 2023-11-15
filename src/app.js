import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'; //"@types/express-fileupload": "^1.4.2",

//import the routes to users
import authRoutes from './routes/auth.routes.js';
//import the routes to infoprofile
import infoProfileRoutes from './routes/infoprofiles.routes.js';
//import the routes to posts
import postRoutes from './routes/post.routes.js';
import likeRoutes from './routes/like.routes.js';
import commentRoutes from './routes/comment.routes.js';
import eventRoutes from './routes/event.routes.js';
import interestRoutes from './routes/interest.routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import multer from 'multer';
import { uuid } from 'uuidv4';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//app.use(express.static('public'));
//app.use('/', express.static(path.join(__dirname, './public')));
//Static Files
app.use(express.static(path.join(__dirname, './public')));

/*app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/files/temp`,
  })
);*/

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single('file'));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Indicated to the server that use the object authRoutes
app.use('/api/', authRoutes);
app.use('/api/', infoProfileRoutes);
app.use('/api/', postRoutes);
app.use('/api/', likeRoutes);
app.use('/api/', commentRoutes);
app.use('/api/', eventRoutes);
app.use('/api/', interestRoutes);

export default app;
