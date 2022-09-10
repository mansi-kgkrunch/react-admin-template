import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'
import mediaRoutes from './routes/media.routes.js'
import categoryRoutes from './routes/category.routes.js'
import subcategoryRoutes from './routes/subcategory.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import customerRoutes from './routes/customer.routes.js'
import metaRoutes from './routes/meta.routes.js'

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
app.use('/api/storage/public/images', mediaRoutes)
app.use('/api/cate', categoryRoutes)
app.use('/api/subcate', subcategoryRoutes) 
app.use('/api/product', productRoutes) 
app.use('/api/order', orderRoutes) 
app.use('/api/customer', customerRoutes) 
app.use('/api/meta' , metaRoutes)