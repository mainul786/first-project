import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routeNotFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// global error handler route
app.use(globalErrorHandler);
// Route not found Router
app.use(routeNotFound);

// app.get('/', (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// });

export default app;
