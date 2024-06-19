import { z } from 'zod';

export const bookValidation = z.object({
    name: z
        .string({ required_error: 'Name is required.' })
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name must be at most 50 characters long.' }),
    description: z
        .string({ required_error: 'Description is required.' })
        .min(10, { message: 'Description must be at least 10 characters long.' })
        .max(500, { message: 'Description must be at most 500 characters long.' }),
    publishDate: z.date({ required_error: 'Publish date is required.' }),
    price: z.number({ required_error: 'Price is required.' }).positive({ message: 'Price must be a positive number.' }),
});
