const config = {
  mongoURL: process.env.NODE_ENV == 'test' ? 
            'mongodb://testaaja:testaaja@ds029436.mlab.com:29436/testikanta' : 
            process.env.MONGO_URL || 'mongodb://developer:developer@ds021036.mlab.com:21036/muistikanta',
  port: process.env.PORT || 8000,
};

export default config;
