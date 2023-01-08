import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        chapters: { type: Number, required: true },
        datePublished: { type: Number, required: true },
        genre: { type: String, required: true },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        }
    },
    { timestamps: true }
)

const Book = mongoose.model('Book', BookSchema)
export default Book