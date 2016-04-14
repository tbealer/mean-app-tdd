var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

var User = new Schema({
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required: true
  },
  admin:{
    type: Boolean,
    default: false
  }
})

var Student = mongoose.model('student', StudentSchema);


module.exports = Student;