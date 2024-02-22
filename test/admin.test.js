const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const router = require('../Routes/Admin'); // Update the path to your router file
const { AdminModel } = require('../AdminModel'); // Update the path to your model file


// Configure Express app to use router
app.use(express.json());
app.use('/admin', router);

// Establish MongoDB connection
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/telegrambotTest', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear database and reset for each test


// Close database connection after all tests
afterAll(async () => {
  await AdminModel.deleteMany({});
  await mongoose.disconnect();
});

// Multer configuration for test uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'testuploads/'); // Define the destination folder for storing test uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
var id
// Test suite for Admin route
describe('/', () => {
  
  const sampleAdminData = {
       
    Name: 'John Doe',
    Email: 'p7bqj@example.com',
    Password: 'password123',
    Role: 'Admin',
    instalinks: 'https://example.com',
    githublink: 'https://github.com',
    portfolio: 'https://example.com',
    Image:'C:/Users/shems computer soln/Desktop/Telegrambot/upload/1708460770084-Screenshot_19-2-2024_72340_localhost.jpeg'
 ,username:'andiiiii'

  };
  describe('POST /admin with file upload', () => {
    it('should upload file and create admin', async () => {
     

      // Make POST request with sample admin data and sample image file
      const res = await request(app)
        .post('/admin')
        .field('Name', sampleAdminData.Name)
        .field('Email', sampleAdminData.Email)
        .field('username',sampleAdminData.username)
        .field('Password', sampleAdminData.Password)
        .field('Role', sampleAdminData.Role)
        .field('instalinks', sampleAdminData.instalinks)
        .field('githublink', sampleAdminData.githublink)
        .field('portfolio', sampleAdminData.portfolio)
        .attach('image', 'C:/Users/shems computer soln/Desktop/Telegrambot/upload/1708460770084-Screenshot_19-2-2024_72340_localhost.jpeg');

      // Assertions
      expect(res.status).toBe(200);
      console.log(res.body._id)
       id=res.body._id
      // Add more specific assertions as needed

      // Clean up: Delete uploaded file after test
 
    });
  });
  describe('GET /admin', () => {
    it('should get all admins', async () => {
      const res = await request(app).get('/admin');
      expect(res.status).toBe(200);
     
    })
  })
  describe('Get Individual Admin', () => {
    it('should  400 if invalid id', async () => {
      const res = await request(app).get('/admin/1');
      expect(res.status).toBe(400);
     
    })
    it('should return the data',async()=>{
      console.log(id)
      const res=await request(app).get(`/admin/${id}`)
      expect(res.status).toBe(200)
    })
    it('should return 404 if data not found',async()=>{

      const res=await request(app).get(`/admin/65d62474ee39dc172d6f72f2`)
      expect(res.status).toBe(404)

    })

  })
  describe('Delete Individual Admin', () => {
    it('should  400 if invalid id', async () => {
      const res = await request(app).delete('/admin/1');
      expect(res.status).toBe(400);
    })
    it('should  sucessfully delete',async()=>{
      const res=await request(app).delete(`/admin/${id}`) 
      expect(res.status).toBe(200)

    })
    it('should return 404 if data not found',async()=>{
      
      const res=await request(app).delete(`/admin/65d62474ee39dc172d6f72f2`)
      expect(res.status).toBe(404)
    })
  })
});
