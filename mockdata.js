const dataMockUtil = require('data-mock-util');
const daoUtil = require('./library/daoUtil');

async function _doWork(){
    await daoUtil.init();
    console.log('Start Mocking');
    let Mock_Users = [{
            email: 'syle@syle.com',
            password: 'password',
            firstName: 'Sy',
            lastName: 'Le',
        }],
        Mock_Violations = [],
        Mock_Notes = [];

    let NUM_MOCK_USER = 5;
    let NUM_MOCK_VIOLATIONS = 5;


    //
    while(NUM_MOCK_USER > 0){
        NUM_MOCK_USER--;

        Mock_Users.push({
            email: dataMockUtil.getEmail(),
            password: 'password',
            firstName: dataMockUtil.getNameWord(),
            lastName: dataMockUtil.getNameWord(),
        });
    }




    console.log('Mock_Users', Mock_Users.length);

    // insert the user itself...
    try{
        await daoUtil.User.bulkCreate(Mock_Users);
    } catch(e){};

    Mock_Users = await daoUtil.User.findAll();



    // mock violations and notes
    while(NUM_MOCK_VIOLATIONS > 0){
        NUM_MOCK_VIOLATIONS--;

        Mock_Violations.push({
            userId: dataMockUtil.getItem(Mock_Users).id,
            licenseNumber: dataMockUtil.getLicensePlate(),
            description: dataMockUtil.getItem(violation_list),
            violationTime: dataMockUtil.getDateObject(),
            long: '',
            lat: '',
            fineAmount: dataMockUtil.getPositiveInteger(9) * 100,
            paid: dataMockUtil.getBoolean(),
        });
    }

    console.log(Mock_Violations);





    console.log('Insert to DB');
}


const violation_list = [
    'Parking in a prohibited space such as a bus stop or in front of a fire hydrant or a driveway or a garage entrance.',
    'Parking on a sidewalk (unless specifically allowed by signs).',
    'Parking in or too close to or within a street crossing, railroad crossing or crosswalk.',
    'Double parking.',
    'Parking at a parking meter without paying, or for longer than the paid time.',
    'Parking in a handicapped zone without an appropriate permit.',
    'Parking without a zone permit in places where parking is severely impacted (such as a residential zone permit, issued to help preserve parking availability for those who live in the permit zone).',
    'Parking without special permit, where one is needed (like a parking for employees of a company).',
    'Parking with the parking permit or payment receipt not visible in the prescribed way, like upside down.',
    'Parking on certain streets in a natural disaster when streets need to be cleared to allow fluid movement of emergency vehicles.',
    'Parking at curb locations designated (usually through signage and/or curb or pavement painting) for special purposes such as passenger zones (for loading and discharge), commercial vehicle zones (for freight or service trucks and vans), police or government vehicle zones, etc.',
    'Parking at locations during scheduled street sweeping.',
    'Parking at locations during posted construction or maintenance operations.',
    'Parking for longer than the maximum time, often that is 24 hours.',
    'Parking facing against the direction of traffic (considered confusing to moving drivers, especially at night).',
    'Parking outside marked squares, for example angle parking where only parallel parking is allowed.',
];

const note_list = [
    'Speeding',
    'Running a red light',
    'Not signaling',
    'Crossing the median',
    'Driving in car pool lane',
    'Not stopping for school bus',
    'Not stopping for pedestrians',
    'Not using seat belt',
    'Driving on shoulder',
    'Passing in a no passing zone',
    'Drunk driving',
    'Reckless driving',
    'Driving without a license, insurance, or registration',
];

_doWork();
