import request from 'supertest';
import { app } from '../../app';
import { Book } from '../../model/book';

const createTestBook = async (name: string, description: string) => {
    const book = Book.build({
        name,
        description,
        publishDate: new Date(),
        price: 20,
    });
    await book.save();
    return book;
};

it('has a route handler listening to /api/books for get requests', async () => {
    const response = await request(app).get('/api/books').send({});
    expect(response.status).not.toEqual(404);
});

it('returns all books if no query parameters are provided', async () => {
    await createTestBook('Book1', 'Description1');
    await createTestBook('Book2', 'Description2');

    const response = await request(app).get('/api/books').send({});
    expect(response.body.length).toEqual(2);
});

it('performs pagination if page and limit query parameters are provided', async () => {
    await createTestBook('Book1', 'Description1');
    await createTestBook('Book2', 'Description2');
    await createTestBook('Book3', 'Description3');

    const response = await request(app).get('/api/books').query({ page: 2, limit: 1 }).send({});
    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('Book2');
});

it('searches books by name or description if search query parameter is provided', async () => {
    await createTestBook('Awesome Book', 'Amazing Description');
    await createTestBook('Another Great Book', 'Fantastic Description');
    await createTestBook('Book Three', 'Description3');

    const response = await request(app).get('/api/books').query({ search: 'great' }).send({});
    expect(response.body.length).toEqual(1);
    expect(response.body.map((book: any) => book.name)).toContain('Another Great Book');
});

it('returns empty array if no books match search criteria', async () => {
    const response = await request(app).get('/api/books').query({ search: 'Nonexistent' }).send({});
    expect(response.body.length).toEqual(0);
});

it('handles invalid page and limit query parameters gracefully', async () => {
    const response = await request(app).get('/api/books').query({ page: 'invalid', limit: 'invalid' }).send({});
    expect(response.body.length).toEqual(0);
});
