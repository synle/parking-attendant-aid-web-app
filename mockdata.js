const dataMockUtil = require('data-mock-util');
const daoUtil = require('./library/daoUtil');

async function _doWork(){
    await daoUtil.init();
    console.log('Start Mocking');
    const Mock_Users = [{
            email: 'syle@syle.com',
            password: 'password',
            firstName: 'Sy',
            lastName: 'Le',
        }],
        Mock_Violations = [],
        Mock_Notes = [];

    let NUM_MOCK_USER = 5;
    while(NUM_MOCK_USER > 0){
        NUM_MOCK_USER--;

        Mock_Users.push({
            email: dataMockUtil.getEmail(),
            password: 'password',
            firstName: dataMockUtil.getNameWord(),
            lastName: dataMockUtil.getNameWord(),
        });
    }


    console.log(Mock_Users);





    console.log('Insert to DB');
}


_doWork();
