import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import authorRoutes from './routes/authors.js'
import bookRoutes from './routes/books.js'
import { register } from './controllers/auth.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//routes
app.post('/auth/register', register)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/authors', authorRoutes)
app.use('/authors/:authorId/books', bookRoutes)


//connect to Database
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'apiproject'
})
    .then(() => app.listen(PORT, () => console.log('Server listening on %d', PORT)))
    .catch((error) => console.log('%d did not connect', error
    ))
