const config = {
  mongoURL: process.env.NODE_ENV == 'test' ? 
            'mongodb://localhost:27017/muisti' : 
            process.env.MONGO_URL || 'mongodb://ohtumuisti:ohtu2016@ds147487.mlab.com:47487/muistidevaus',
  port: process.env.PORT || 8000,
};

export default config;
