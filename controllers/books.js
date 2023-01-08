import Book from '../models/Book.js'

export const getBooks = async (req, res) => {
    try {
        const books = await Book
            .find({ authorId: req.params.authorId })
            .populate('authorId')
            .select('code title chapters datePublished genre authorId')
        if (books.length !== 0)
            res.status(200).json(books)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
            .populate('authorId')
            .select('code title chapters datePublished genre authorId')
        if (book)
            res.status(200).json(book)
        else
            res.status(400).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addBook = async (req, res) => {
    try {
        const { code, title, chapters, datePublished, genre } = req.body
        const authorId = req.params.authorId
        const newBook = await Book.create({
            code,
            title,
            chapters,
            datePublished,
            genre,
            authorId
        })
        const savedBook = await newBook.save()
        res.status(201).json({ id: savedBook._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteBook = async (req, res) => {
    try {
        await Book.deleteOne({
            authorId: req.params.authorId,
            _id: req.params.id
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateBook = async (req, res) => {
    try {
        const filter = {
            authorId: req.params.authorId,
            _id: req.params.id
        }
        const { code, title, chapters, datePublished, genre } = req.body
        const update = {
            code: code,
            title: title,
            chapters: chapters,
            datePublished: datePublished,
            genre: genre
        }
        await Book.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}