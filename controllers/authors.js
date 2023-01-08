import Author from '../models/Author.js'

export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find()
        if (authors.length !== 0)
            res.status(200).json(authors)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findById(id)
        if (author)
            res.status(200).json(author)
        else
            res.status(404).json({ error: 'resource not found ' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addAuthor = async (req, res) => {
    try {
        const { username, fullName, gender } = req.body
        const newAuthor = await Author.create({
            username,
            fullName,
            gender
        })
        const savedAuthor = await newAuthor.save()
        res.status(201).json({ id: savedAuthor._id })
    } catch (err) {
        res.status(500).json({ error: err.mesaage })
    }
}

export const deleteAuthor = async (req, res) => {
    try {
        await Author.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateAuthor = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { username, fullName, gender } = req.body
        const update = {
            username: username,
            fullName: fullName,
            gender: gender
        }

        await Author.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}