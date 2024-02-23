
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const dbmangaer = require('./db');
const app = express();

const ProjectRoute=require('./Routes/Project.js')
const MessageRoute=require('./Routes/Message.js')
const AdminRoute=require('./Routes/Admin.js')
const BlogRoute=require('./Routes/Blog.js')
const CatagoryRoute=require('./Routes/Catagory.js')
const Auth=require('./Routes/Auth')
const logger = require('./logger');
app.use(cors());
app.use(bodyParser.json());
process.on('uncaughtException', (ex) => {
    logger.error('Uncaught Exception:', ex);
    process.exit(1); // Exit the process
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit the process
  });
  

if(!process.env.JWT_SECRET){
logger.error('JWT_SECRET is not defined');
process.exit(1);
}


async function connect() {
    try {
        const result = await dbmangaer.connect();
        app.listen(3000, () => {
            console.log(`Server is running on  ${3000}`);
        });
        
    }
    catch (err) {
        console.log('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}
const uploadDirectory = path.join(__dirname, 'upload');


app.use('/images', express.static(uploadDirectory));

app.use('/project',ProjectRoute)
app.use('/message',MessageRoute)
app.use('/admin',AdminRoute)
app.use('/blog',BlogRoute)
app.use('/catagory',CatagoryRoute)
app.use('/auth',Auth)





connect()
