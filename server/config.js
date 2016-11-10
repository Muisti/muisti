const config = {
  mongoURL: process.env.NODE_ENV == 'test' ? 
            'mongodb://väärä:väärä@ds029436.mlab.com:29436/testikanta' : 
            process.env.MONGO_URL || 'mongodb://ohtumuisti:ohtu2016@ds147487.mlab.com:47487/muistidevaus',
  port: process.env.PORT || 8000,
};

export default config;
