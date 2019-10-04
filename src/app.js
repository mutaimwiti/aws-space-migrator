import connect from './db';

const main = () => {
  connect((err, conn) => {
    if (err) {
      throw err;
    }

    console.log('connected');
  })
};

export default main;
