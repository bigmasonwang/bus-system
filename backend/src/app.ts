import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { HttpError } from 'http-errors';
import 'dotenv/config';
import apiRouter from './router/api';
import notFind from './middleware/notFind';

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(notFind);

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});

export default app;
