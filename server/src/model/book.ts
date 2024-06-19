import mongoose from 'mongoose';

interface BookAttrs {
    name: string;
    description: string;
    publishDate: Date;
    price: number;
    imageUrl: string;
}

// Interface that describes the properties that a book model has
interface BookModel extends mongoose.Model<BookDoc> {
    build(attrs: BookAttrs): BookDoc;
}

// Interface that describes the properties a book document has
export interface BookDoc extends mongoose.Document {
    name: string;
    description: string;
    publishDate: Date;
    price: number;
    imageUrl: string;
}

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        publishDate: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            reqruied: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

bookSchema.statics.build = (attrs: BookAttrs) => {
    return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
