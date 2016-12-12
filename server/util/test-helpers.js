import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('localhost', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}
