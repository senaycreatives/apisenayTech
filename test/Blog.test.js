const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const router = require('../Routes/Blog'); 
const { BlogModel } = require('../BlogModel'); 

app.use(express.json());
app.use('/blog', router);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/telegrambotTest', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await BlogModel.deleteMany({});
    await mongoose.disconnect();
})

describe('/', () => {
    describe('Get All Blogs', () => {
        it('should return all blogs', async () => {
            const res = await request(app).get('/blog');
            expect(res.status).toBe(200);
        })
    })

     
})