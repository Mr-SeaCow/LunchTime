const sql = require('mssql')
const dotenv = require('dotenv');
const sqlConstants = require('../constants/sqlConstants');
const sqlQueryStrings = require('../constants/queryStrings');
dotenv.config();


const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    encrypt: true
}


class sqlServerInterface {

    constructor(config) {
        this.sqlPool = new sql.ConnectionPool(config);
        this.sqlPoolConnect = this.sqlPool.connect();

        this.sqlPool.on('error', err => {
            console.log(err);
        })
    }

    // INPUT/OUTPUT PARAMS = [{data: 'string', sql.Int, size?}]
    sendQuery(statement, callback) {
        this.sqlPoolConnect.then((pool) => {
            pool.query(statement).then((res) => {
                callback(res);
            })
        })
    }

    createStudent(options, callback) {
        console.log(options)
        this.sqlPoolConnect.then((pool) => {
            pool.request()
                .input('AccountID', sql.Int, options.accountId)
                .input('FirstName', sql.NVarChar(50), options.firstName)
                .input('LastName', sql.NVarChar(50), options.lastName)
                .input('GradeNumber', sql.VarChar(5), options.gradeNumber)
                .input('AllowChargingLunch', sql.Bit, options.allowChargingLunch === '1' ? true : false)
                .input('HotLunchOnly', sql.Bit, options.hotLunchOnly === '1' ? true : false)
                .input('IsActive', sql.Bit, true)
                .input('Allergies', sql.VarChar(100), options.allergies)
                .input('EmailAddress', sql.VarChar(150), options.emailAddress)
                .output('StudentID', sql.Int)
                .execute('dbo.proc_InsertStudent', (err, result) => {
                    console.log(err);
                    callback(result);
                })
        }).catch(err => {
            console.log(err);
        })
    }

    createFood(options, callback) {
        this.sqlPoolConnect.then((pool) => {
            pool.request()
                .input('FoodName', sql.VarChar(50), options.foodName)
                .input('FoodCategory', sql.VarChar(30), options.foodCategory)
                .input('FoodAmount', sql.Money, options.foodAmount)
                .input('IsActive', sql.Bit, 1)
                .output('FoodID', sql.Int)
                .execute('dbo.proc_InsertFood', (err, result) => {
                    console.log(err);
                    callback(result);
                })
        }).catch(err => {
            console.log(err);
        })
    }

    //conditionalArray = [{tableName: 'Students', columnName: 'StudentID', operator: '=', value: '123123'}]
    getStudents(options, callback) {
        console.log(options)
        const lunch = options.lunch || null;
        const grade = options.grade || null;
        const isActive = options.isActive || 1;

        let queryString = sqlQueryStrings.getStudents.default;
        if (lunch != null)
            queryString += sqlQueryStrings.getStudents.whereLunch.replace('@InputLunch', lunch);
        else if (grade != null)
            queryString += sqlQueryStrings.getStudents.whereGrade.replace('@InputGrade', grade);
        else
            queryString += sqlQueryStrings.getStudents.defaultWhere;

        queryString = queryString.replace('@InputIsActive', isActive);
        queryString += ';';

        console.log(queryString);

        this.sendQuery(queryString, callback);
    }

    getStudent(options, callback) {
        const studentId = options.studentId || null;

        let queryString = sqlQueryStrings.getStudent.default;

        queryString.replace('@InputID', studentId);
        queryString += ';';

        console.log(queryString);

        this.sendQuery(queryString, callback);
    }

    getStudentAndAccount(options, callback) {
        const studentId = options.studentId || null;

        let queryString = sqlQueryStrings.getStudentAndAccount.default;

        queryString.replace('@InputID', studentId);
        queryString += ';';

        console.log(queryString);

        this.sendQuery(queryString, callback);
    }

    getAccount(options, callback) {
        const accountId = options.accountId || null;

        let queryString = sqlQueryStrings.getAccount.default;

        queryString.replace('@InputID', accountId);
        queryString += ';';

        console.log(queryString);

        this.sendQuery(queryString, callback);
    }
    getFood(options, callback) {
        const foodId = options.foodId || null;
        const foodCategory = options.foodCategory || null;
        const isActive = options.isActive || 1;

        let queryString = sqlQueryStrings.getFood.default;

        if (foodId != null)
            queryString += sqlQueryStrings.getFood.whereFoodId.replace('@InputID', lunch);
        else if (foodCategory != null)
            queryString += sqlQueryStrings.getFood.whereCategory.replace('@InputCategory', grade);
        else
            queryString += sqlQueryStrings.getFood.defaultWhere;

        queryString += ';';
        queryString.replace('@InputIsActive', isActive);

        console.log(queryString);

        this.sendQuery(queryString, callback);
    }
}


const sqlClass = new sqlServerInterface(config);

module.exports.sqlInterface = sqlClass;