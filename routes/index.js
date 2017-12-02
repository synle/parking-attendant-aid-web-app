const builder = require('botbuilder');
const _ = require('lodash');
const resourceUtil = require('../library/resourceUtil');


// route definitions...
module.exports = function(app, passport){
    // auth
    app.get('/', function(req, res, next) {
        res.render('index', {});
    });

    // get - login form
    app.get('/login', function(req, res, next) {
        res.render('login', { message: req.flash('loginMessage') });
    });


    app.get('/status', function(req, res, next) {
        res.render(
            'citation_check_chatbot',
            {
                BOT_SECRET: process.env.BOT_SECRET,
            }
        );
    });



    // post - process login ajax
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    app.post('/login/mobile', function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;


        resourceUtil.loginWithMobile(
            username,
            password
        ).then(function(authObject){
            res.json({
                success: true,
                value: authObject
            })
        }, function(error){
            res.status(400);
            res.json({ success: false, error})
        })
    });


    // get sign up form
    app.get('/signup', function(req, res, next) {
        res.render('signup', { message: req.flash('signupMessage') }  );
    });


    // post - process the signup ajax
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // =====================================
    // AUTHENTICATED PAGES =================
    // =====================================

    // main profile page
    app.get('/profile', isLoggedIn, async function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;

        // console.log(user);
        res.render('profile', {
            user : req.user, // get the user out of session and pass to template
            power_bi_dashboard: process.env.POWER_BI_DASHBOARD,
        });
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // log out for mobile
    app.post('/logout/mobile', isLoggedIn, function(req, res, next){
        var token = req.authToken;

        resourceUtil.logoutWithMobile(
            req.authToken
        ).then(function(authObject){
            res.json({
                success: true,
                message: 'You are logged out'
            })
        }, function(){
            res.status(400);
            res.json({ success: false})
        })
    });

    app.get('/api/v1/user', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;
        res.json({
            success: true,
            value: user
        })
    });




    // Notes api
    // Notes api
    // Notes api
    app.get('/api/v1/note', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;


        resourceUtil.getAllNotes()
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });


    app.get('/api/v1/note/userid/:target_user_id', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;

        const {target_user_id} = req.params;

        resourceUtil.getAllNotesByUserId(target_user_id)
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });



    app.get('/api/v1/note/licensenumber/:target_license_number', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;


        const {target_license_number} = req.params


        resourceUtil.getAllNotesByLicenseNumber(target_license_number)
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });



    /**
     POST http://localhost:8080/api/v1/note
     {
        "licenseNumber": "num1",
        "description": "desc",
        "recordTime": 1508713739898,
        "long": 111,
        "lat": 222
    }
     */
    app.post('/api/v1/note', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;

        const {
            licenseNumber,
            description,
            recordTime,
            long,
            lat,
        } = req.body;


        // console.log('recordTime', recordTime)
        console.log('licenseNumber: ', licenseNumber)
        console.log('description: ', description)
        console.log('recordTime: ', recordTime)
        console.log('long: ', long)
        console.log('lat: ', lat)

        resourceUtil.createNote({
            userId,
            licenseNumber,
            description,
            recordTime,
            long,
            lat
        }).then(
            function success(){
                res.json({
                    success: true
                })
            },
            function error(){
                res.json({
                    success: false
                })
            }
        )
    });








    // violation api
    // violation api
    // violation api
    app.get('/api/v1/violation', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;

        resourceUtil.getAllViolations()
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });


    app.get('/api/v1/violation/userid/:target_user_id', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;
        const {target_user_id} = req.params;

        resourceUtil.getAllViolationsByUserId(target_user_id)
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });


    app.get('/api/v1/violation/licensenumber/:target_license_number', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;
        const {target_license_number} = req.params

        resourceUtil.getAllViolationsByLicenseNumber(target_license_number)
            .then(
                function success(value){
                    res.json({
                        success: true,
                        value
                    })
                },
                function error(value){
                    res.json({
                        success: false,
                        value
                    })
                }
            )
    });


    /**
     POST http://localhost:8080/api/v1/violation
     {
        "licenseNumber": "num1",
        "description": "desc",
        "violationTime": 1508713739898,
        "long": 111,
        "lat": 222,
        "fineAmount": 50,
        "paid": false
    }
     */
    app.post('/api/v1/violation', isLoggedIn, function(req, res) {
        const user = req.user;
        const userId = user.id;
        const userEmail = user.email;


        const {
            licenseNumber,
            description,
            violationTime,
            long,
            lat,
            fineAmount,
            paid,
        } = req.body;


        console.log('licenseNumber: ', licenseNumber);
        console.log('description: ', description);
        console.log('violationTime: ', violationTime);
        console.log('long: ', long);
        console.log('lat: ', lat);
        console.log('fineAmount: ', fineAmount);
        console.log('paid: ', paid);


        resourceUtil.createViolation({
            userId,
            licenseNumber,
            description,
            violationTime,
            long,
            lat,
            fineAmount,
            paid
        }).then(
            function success(){
                res.json({
                    success: true
                })
            },
            function error(){
                res.json({
                    success: false
                })
            }
        )
    });


    // =====================================
    // AUTHENTICATED PAGES =================
    // =====================================
    const connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });


    // Listen for messages from users
    app.post('/api/messages', connector.listen());


    // This is a dinner reservation bot that uses multiple dialogs to prompt users for input.
    var bot = new builder.UniversalBot(connector, [
        // Step 1
        async function (session) {
            session.send('Welcome to Parking Aid Automatic System. I am a bot, can help you with basic look up your violations.')
            builder.Prompts.text(session, 'To get started, whats your license plate #?');
        },
        async function (session, results) {
            if(session.userData){
                session.userData = {};
            }

            session.userData.licensePlate = results.response;
            console.log(results.response);


            session.send(`Looking up information for License Plate #: ${session.userData.licensePlate}`);

            session.replaceDialog('showViolations');
        },
    ])


    bot.dialog("showViolations", [
        async function (session) {
            const licensePlate = session.userData.licensePlate;

            session.userData.violations = [];
            try{
                session.userData.violations = await resourceUtil.getAllViolationsByLicenseNumber(licensePlate);
            } catch(e){};

            builder.Prompts.choice(session, "Select one of the following violations?", session.userData.violations
                .filter(cur_event => !cur_event.paid)
                .map((cur_event, cur_idx) => {
                    return [
                        new Date(cur_event.violationTime).toDateString() + ' - ' + _.truncate(cur_event.description, 25, '...'),
                    ].join('\n');
                })
            );
        },
        async function (session, results) {
            const event = session.userData.violations[results.response.index];

            session.send(`violationTime: ${event.violationTime}`);
            session.send(`licenseNumber: ${event.licenseNumber}`);
            session.send(`description: ${event.description}`);
            session.send(`violationTime: ${event.violationTime}`);
            session.send(`fineAmount: ${event.fineAmount}`);
            session.send(`paid: ${event.paid ? 'PAID': 'NOT PAID'}`);



            session.send('Map for this violation can be found at: https://maps.google.com/?ll=' + event.lat + ',' + event.long);
            // session.send('http://staticmap.openstreetmap.de/staticmap.php?center=' + event.lat + ',' + event.long + '&zoom=14&size=865x512&maptype=mapnik');
            session.send('Visit this PayPal link to pay...');
            // session.send('http://paypal.com/' + event.id);
            session.send('https://www.paypal.com/webapps/hermes?token=80A28161F58136108&useraction=commit&mfid=1512177462343_4e0e0b7b579f')


            session.replaceDialog('showViolations');
        },
    ])

}



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    var authHeader = req.headers.authorization;
    // console.log('authHeader', authHeader)

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        // web...
        return next();
    }
    else if(authHeader){
        // mobile auth...
        return resourceUtil.findLocalUserByAccessToken(authHeader)
            .then(function(foundUser){
                req.user = foundUser;
                req.authToken = authHeader;
                next()
            }, function(){
                res.status(403);
                res.json({
                    success: false,
                    message: 'Forbidden'
                })
            })
    }


    // if they aren't redirect them to the home page
    res.redirect('/');
}
