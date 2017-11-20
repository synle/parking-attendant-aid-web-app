// external
var uuid = require('node-uuid');

// internal
var daoUtil = require('./daoUtil');


var resourceUtil = {
  createUserLocal: function(email, firstName, lastName, password){
    var encryptedPassword = _getEncryptedPassword(password);
    return daoUtil.User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: encryptedPassword,
    });
  },
  findLocalUserByEmailAndPassword: function(email, password){
    var encryptedPassword = _getEncryptedPassword(password);
    return daoUtil.User.findAll({
      attributes: { exclude: ['password'] },
      where: { email: email, password: encryptedPassword, }
    });
  },
  findLocalUser: function(email){
    return daoUtil.User.findAll({
      attributes: { exclude: ['password'] },
      where: { email: email }
    });
  },
  findLocalUserByUserId: function(userId){
    return daoUtil.User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: userId }
    });
  },

  findLocalUserByAccessToken: function(accessToken){
    // check access token is valid, then get user info...
    return daoUtil.AccessToken.findOne({
        where: { token: accessToken, expired: false }
      }).then(function(accessTokenObject){
        return resourceUtil.findLocalUserByUserId(accessTokenObject.userId);
      })
  },


  // access token
  loginWithMobile: function(email, password){
    var encryptedPassword = _getEncryptedPassword(password);
    var promiseFoundUser = new Promise(function(resolve, reject){
      daoUtil.User.findOne({
        attributes: { exclude: ['password'] },
        where: { email: email, password: encryptedPassword, }
      }).then(
        function(foundUser){
          if(!foundUser){
            throw 'User not found...'
          }

          // found user, then create token...
          var tokenObject = {
            userId  : foundUser.id,
            token   : _generateRandomAccessToken(),
            expired : false
          };

          return daoUtil.AccessToken.create(tokenObject).then(
            resolve.bind(
              null,
              Object.assign(
                {token: tokenObject.token},
                foundUser
              )
            ),
            reject
          )
        },
        function(error){
          reject(error);
        }
      );
    });


    return promiseFoundUser;
  },


  logoutWithMobile: function(authToken){
    return daoUtil.AccessToken.destroy({
      where: { token: authToken }
    });
  },


  // notes
  createNote: function({
    userId,
    licenseNumber,
    description,
    recordTime,
    long,
    lat
  }){
    return daoUtil.Note.create({
      userId,
      licenseNumber,
      description,
      recordTime,
      long,
      lat
    })
  },


  getAllNotes: function(){
    return daoUtil.Note.findAll({
      where: {},
      order: '"updatedAt" DESC'
    });
  },



  getAllNotesByLicenseNumber: function(licenseNumber){
    return daoUtil.Note.findAll({
      where: {licenseNumber},
      order: '"updatedAt" DESC'
    });
  },


  getAllNotestionsByUserId: function(userId){
    return daoUtil.Note.findAll({
      where: {userId},
      order: '"updatedAt" DESC'
    });
  },





  // violations
  createViolation: function({
    userId,
    licenseNumber,
    description,
    violationTime,
    long,
    lat,
    fineAmount,
    paid
  }){
    return daoUtil.Violation.create({
      userId,
      licenseNumber,
      description,
      violationTime,
      long,
      lat,
      fineAmount,
      paid
    })
  },



  getAllViolations: function(){
    return daoUtil.Violation.findAll({
      where: {},
      order: '"updatedAt" DESC'
    });
  },


  getAllViolationsByLicenseNumber: function(licenseNumber){
    return daoUtil.Violation.findAll({
      where: {licenseNumber},
      order: '"updatedAt" DESC'
    });
  },


  getAllViolationsByUserId: function(userId){
    return daoUtil.Violation.findAll({
      where: {userId},
      order: '"updatedAt" DESC'
    });
  },




};

function _getEncryptedPassword(password){
  return password;
}

function _generateRandomAccessToken() {
  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 256; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return uuid.v4() + '-' + text;
}


module.exports = resourceUtil;
