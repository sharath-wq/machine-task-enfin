import request from 'supertest';
import { app } from '../../app';
import { Book } from '../../model/book';

it('has a route handler listening to /api/books for post requests', async () => {
    const response = await request(app).post('/api/books').send({});
    expect(response.status).not.toEqual(404);
});

// Test for invalid name
it('returns an error if an invalid name is provided', async () => {
    await request(app)
        .post('/api/books')
        .send({
            name: '',
            description: 'This is a description',
            publishDate: new Date(),
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .send({
            description: 'This is a description',
            publishDate: new Date(),
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

// Test for invalid description
it('returns an error if an invalid description is provided', async () => {
    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: '',
            publishDate: new Date(),
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            publishDate: new Date(),
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

// Test for invalid publishDate
it('returns an error if an invalid publishDate is provided', async () => {
    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            publishDate: 'invalid-date',
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            price: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

// Test for invalid price
it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            publishDate: new Date(),
            price: 'invalid-price',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            publishDate: new Date(),
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

// Test for invalid imageUrl
it('returns an error if an invalid imageUrl is provided', async () => {
    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            publishDate: new Date(),
            price: 100,
            imageUrl: 'invalid-url',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .send({
            name: 'Book name',
            description: 'This is a description',
            publishDate: new Date(),
            price: 100,
        })
        .expect(400);
});

it('creates a book with valid inputs', async () => {
    let books = await Book.find({});
    expect(books.length).toEqual(0);

    const name = 'Book name';
    const description = 'This is a description';
    const publishDate = new Date();
    const price = 100;
    const imageUrl = 'http://example.com/image.jpg';

    const response = await request(app)
        .post('/api/books')
        .send({
            name,
            description,
            publishDate,
            imageUrl,
            price,
        })
        .expect(201);

    books = await Book.find({});

    expect(books.length).toEqual(1);
    expect(books[0].name).toEqual(name);
    expect(books[0].description).toEqual(description);
    expect(books[0].price).toEqual(price);
    expect(books[0].publishDate).toEqual(publishDate);
    expect(books[0].imageUrl).toEqual(imageUrl);
});
