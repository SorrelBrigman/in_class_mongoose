'use strict'


const express = require("express");
const {json} = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(json());

mongoose.Promise = Promise;

//create model

const studentSchema = {
  name: String,
  favoriteColor: String,
  likes: [String], //array of strings
  teachers: [mongoose.Schema.Types.ObjectId]
}


const Student = mongoose.model('Student', studentSchema)

const Teacher = mongoose.model('Teacher', {
  name: String,
  favoriteColor: String,
  previousEmployer: String,
  students: [studentSchema]
})

const MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/cohort17'
const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
  Student
  .find()
  .then((students) => {
    res.json(students)
  })
})

app.post('/addStudent', (req, res, next) => {
  let student = req.body;
  console.log("student", student);
  Student
  .create(student)
  .then((data) => {
    res.json(data)
  })
})

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    })
  })
  .catch(console.error)
