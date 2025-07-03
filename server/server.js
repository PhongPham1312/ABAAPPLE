import express from 'express'
import bodyParser from 'body-parser'
const cors = require('cors')
require('dotenv').config()
import initWebRoutes from './src/route/web'
import connectDB from './src/config/connectDB'

const app = express() // khởi tạo app
connectDB();
// cổng chạy
const port = process.env.PORT || 8081

// middleware
app.use(cors()) // nhận kết nối client
app.use(bodyParser.json());

// router
initWebRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
