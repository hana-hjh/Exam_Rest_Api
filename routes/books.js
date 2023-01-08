import express from 'express'
import { getBook, getBooks, addBook, updateBook, deleteBook } from '../controllers/books.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.get('/', verifyToken, getBooks)
router.get('/:id', verifyToken, getBook)
router.post('/', verifyToken, addBook)
router.put('/:id', verifyToken, updateBook)
router.delete('/:id', verifyToken, deleteBook)

export default router 