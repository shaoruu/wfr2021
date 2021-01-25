import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
