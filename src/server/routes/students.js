var express = require('express');
var router = express.Router();
var Student = require('../models/students');

// GET ALL students
router.get('/', function(req, res, next) {
    
    Student.find({})
      .then(function (students) {
        res.status(200).json({
          status: 'success',
          data: students
        });
      })
        .catch(function(err){
          return next(err);
        });

  // Student.find({}, function(err, students) {
  //   if(err) {
  //     return next(err);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: students
  //   });
  // });
});

// GET single students
router.get('/:id', function(req, res, next) {
  var studentID = req.params.id;
    
    Student.find(studentID)
      .then(function(student){
        res.status(200).json({
          status: 'success',
          data: student
        });
      })
      .catch(function(err){
          return next(err);
        });


  // Student.findById(studentID, function(err, student) {
  //   if(err) {
  //     return next(err);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});

// add student
router.post('/', function(req, res, next) {
  var student = new Student(req.body);
    
    Student.save(student)
      .then(function(student){
        res.status(200).json({
          status: 'success',
          data: student
        });
      })
      .catch(function(err){
          return next(err);
        });






  // student.save(function(err, student) {
  //   if(err) {
  //     return next(err);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});

// update student
router.put('/:id', function(req, res, next) {
  var studentID = req.params.id;
  
  Student.findByIdAndUpdate(studentID(studentID, req.body, {new: true})
      .then(function(student){
        res.status(200).json({
          status: 'success',
          data: student
        });
      })
      .catch(function(err){
          return next(err);
        });





  // Student.findByIdAndUpdate(studentID, req.body, {new: true},
  //   function(err, student) {
  //   if(err) {
  //     return next(err);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});

// remove student
router.delete('/:id', function(req, res, next) {
  var studentID = req.params.id;
    
    Student.findByIdAndRemove(studentID(studentID)
      .then(function(student){
        res.status(200).json({
          status: 'success',
          data: student
        });
      })
      .catch(function(err){
          return next(err);
        });





  // Student.findByIdAndRemove(studentID, function(err, student) {
  //   if(err) {
  //     return next(err);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});


module.exports = router;
