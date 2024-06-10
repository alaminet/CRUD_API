const mongoose = require('mongoose');

let mongoConfig = ()=>{
    mongoose.connect(process.env.mongodbURL)
  .then(() => console.log('mongodb Connected!'));
}

module.exports = mongoConfig;