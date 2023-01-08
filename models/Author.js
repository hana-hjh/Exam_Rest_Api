import mongoose from 'mongoose'

const AuthorSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        gender: { type: String, required: true }
    },
    { timestamps: true }
)

const Author = mongoose.model('Author', AuthorSchema)
export default Author