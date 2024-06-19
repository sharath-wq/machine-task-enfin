import express, { Request, Response } from 'express';
import { Book } from '../model/book';

interface BookQuery {
    search?: string;
    page?: string | number;
    limit?: string | number;
}

const router = express.Router();

router.get('/api/books', async (req: Request<{}, {}, {}, BookQuery>, res: Response) => {
    let query: any = {};

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    const skip = (page - 1) * limit;

    // Searching by name or description
    if (req.query.search) {
        query['$or'] = [
            { name: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive search by name
            { description: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive search by description
        ];
    }

    const books = await Book.find(query).skip(skip).limit(limit);
    res.send(books);
});

export { router as getBooksRouter };
