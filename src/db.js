import {MongoClient} from 'mongodb';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connect = () => {
  const {DB_NAME, MONGO_URI} = process.env;

  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URI, options, (err, client) => {
      if (err) {
        return reject(err);
      }
      return resolve(client.db(DB_NAME));
    })
  });
};


export default connect;
