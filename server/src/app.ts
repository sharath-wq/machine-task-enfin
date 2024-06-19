import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';

import { createBookRouter } from './routes/new';
import { getBooksRouter } from './routes';

const corsOptions = {
    origin: true,
    credentials: true,
};

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors(corsOptions));

app.use(createBookRouter);
app.use(getBooksRouter);

// Not found hanlder
app.all('*', async () => {
    throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
