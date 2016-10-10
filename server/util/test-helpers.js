import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('mongodb://testaaja:testaaja@ds029436.mlab.com:29436/testikanta', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t, done) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
    done();
  });
}
