import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'

const URL = process.env.HOST_URL
const HOST = process.env.HOST
const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())

await mongoose.connect(process.env.DB_URI)
    .catch(err => {
        console.error(err.stack)
        process.exit()
    })
    .then(async client => {
        app.listen(PORT, HOST, () => {
            console.log(`Api Listenig at ${URL}:${PORT}`)
        })
    })
// console.log(conn)
app.use('/api/user', userRoutes)