const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const connect = () => {
   mongoose.connect(process.env.MONGO_URI);
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', function callback () {
      console.log("Connected to MongoDB Atlas");
   });
   
};

module.exports = {
   connect
};
