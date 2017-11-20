const morgan = require('morgan')
const app = require('./app');
const daoUtil = require('./library/daoUtil');

app.use(morgan('combined'))

async function _doWork(){
    await daoUtil.init();

    const port = process.env.PORT || 8080;
    console.log('App is now listenting on port: ', port);
    app.listen(port);
}


_doWork();
