const config = {
  mongoURL: process.env.NODE_ENV == 'test' ?
    'mongodb://testaaja:testaaja@ds147497.mlab.com:47497/testikanta2' :
  process.env.MONGO_URL || 'mongodb://ohtumuisti:ohtu2016@ds147487.mlab.com:47487/muistidevaus',
  port: process.env.PORT || 8000
};

export default config;
