const mongoose = require('mongoose');

const uri = 'mongodb+srv://serenabehera:Cari123456@cluster0.mongodb.net/feedback?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });