// @ts-nocheck
const mongoose = require('mongoose');
const validator =  require ('validator')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercalse: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
          if (value < 0) {
              throw new Error('Age must  be a possitive number')
          }
      }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({description:'Kukuriku tarengol', completed: false})

// task.save().then(()=>{
//     console.log({task})
// }).catch(error => console.log({error}))

const me = new User({
  name: "Ivan",
  email: 'karlsson.ivan@gmail.com'
});

me.save().then(() => {
    console.log({me})
}).catch((error) => {
    console.log(error)
})