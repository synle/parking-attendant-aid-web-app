const dataMockUtil = require('data-mock-util');
const daoUtil = require('./library/daoUtil');

async function _doWork(){
    await daoUtil.init();
    console.log('Start Mocking');
}


_doWork();
