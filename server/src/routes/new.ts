import express, { Request, Response } from 'express';
import { Book } from '../model/book';
import { validateRequest } from '../middleware/validate-request';
import { validateBook } from '../middleware/book-validator';

const router = express.Router();

router.post('/api/books', validateBook, validateRequest, async (req: Request, res: Response) => {
    const { name, description, publishDate, price } = req.body;

    const book = Book.build({ name, description, publishDate, price });

    await book.save();

    res.status(201).send(book);
});

export { router as createBookRouter };
