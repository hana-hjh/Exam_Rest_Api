import express from 'express'
import { getAuthor, getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../controllers/authors.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/', verifyToken, getAuthors)
router.get('/:id', verifyToken, getAuthor)
router.post('/', verifyToken, addAuthor)
router.put('/:id', verifyToken, updateAuthor)
router.delete('/:id', verifyToken, deleteAuthor)

export default router 