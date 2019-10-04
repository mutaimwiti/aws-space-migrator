import {MongoClient} from 'mongodb';

const getClient = () => {
  const {MONGO_URI} = process.env;

  return new MongoClient(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

const connect = (cb) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      cb(err, null);
    } else {
      cb(false, client);
    }
  });
};

export default connect;
