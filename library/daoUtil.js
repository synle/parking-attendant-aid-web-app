const Sequelize = require('sequelize');
const Table = require('sequelize-simple-adapter');

const shouldUseCloud = process.env.DB_HOST
    && process.env.DB_NAME
    && process.env.DB_USER
    && process.env.DB_PASSWORD;


// if there is a db connection, then use it...
const sequelize = !!process.env.MAIN_DB_HOST
    ? new Sequelize(
        process.env.MAIN_DB_NAME,
        process.env.MAIN_DB_USER,
        process.env.MAIN_DB_PASSWORD,
        {
            host: process.env.MAIN_DB_HOST,
            dialect: 'mssql',
            logging: false,
            pool: {
                max: 5,
                min: 0,
            },
            dialectOptions: {
                encrypt: true
            },
        }
    )
    : new Sequelize(
        'db_user', // 'database',
        '', // 'username',
        '', // 'password',
        {
            dialect: 'sqlite',
            storage: './db.sqlite3',
            logging: false
        }
    );

// might only need to run for init call...
const promiseSequelizeInit = sequelize.sync().then(function (argument) {
    // TODO: remove this log line...
    console.log('Database...synced... read to use', process.env.MAIN_DB_HOST);
});


const User = sequelize.define('parking_users', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    email            : { type: Sequelize.STRING, allowNull: false, unique: true},
    password         : { type: Sequelize.STRING, allowNull: false, },
    firstName        : { type: Sequelize.STRING, allowNull: false, },
    lastName         : { type: Sequelize.STRING, allowNull: false, },
});


const AccessToken = sequelize.define('parking_accesses', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    userId           : { type: Sequelize.DataTypes.UUID, allowNull: false, },
    token            : { type: Sequelize.TEXT },
    expired          : { type: Sequelize.BOOLEAN, defaultValue: false },
});


const Violation = sequelize.define('parking_violations', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    userId           : { type: Sequelize.DataTypes.UUID, allowNull: false },
    licenseNumber    : { type: Sequelize.STRING },
    description      : { type: Sequelize.TEXT },
    violationTime    : { type: Sequelize.DATE },
    long             : { type: Sequelize.FLOAT },
    lat              : { type: Sequelize.FLOAT },
    fineAmount       : { type: Sequelize.FLOAT },
    paid             : { type: Sequelize.BOOLEAN, defaultValue: false },
});


const Note = sequelize.define('parking_notes', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    userId           : { type: Sequelize.DataTypes.UUID, allowNull: false },
    licenseNumber    : { type: Sequelize.STRING },
    description      : { type: Sequelize.TEXT },
    recordTime       : { type: Sequelize.DATE },
    long             : { type: Sequelize.FLOAT },
    lat              : { type: Sequelize.FLOAT },
});


module.exports = {
    init: async () => {
        await promiseSequelizeInit;
    },
    sequelizeAdapter: sequelize,
    User        : new Table(User, promiseSequelizeInit),
    AccessToken : new Table(AccessToken, promiseSequelizeInit),
    Note        : new Table(Note, promiseSequelizeInit),
    Violation   : new Table(Violation, promiseSequelizeInit),
}
