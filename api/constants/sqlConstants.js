module.exports.Student = Object.freeze({
    columns: ['StudentID', 'AccountID', 'FirstName', 'LastName', 'GradeNumber', 'AllowChargingLunch', 'HotLunchOnly', 'IsActive', 'Allergies', 'CreatedDate'],
    formatting: ['int', 'int', 'nvharchar(50)', 'nvarchar(50)', 'varchar(5)', 'bit', 'bit', 'bit', 'varchar(100)', 'datetime']
})

module.exports.Account = Object.freeze({
    columns: ['AccountID', 'AccountName', 'IsActive', 'AccountBalance', 'EmailAddress', 'CreatedDate' ],
    formatting: ['int', 'varchar(50)', 'bit', 'money', 'varchar(150)', 'datetime']
})

module.exports.Food = Object.freeze({
    columns: ['FoodID', 'FoodName', 'FoodCategory', 'FoodAmount', 'IsActive'],
    formatting: ['int', 'varchar(50)', 'varchar(30)', 'money', 'bit']
})

module.exports.Grade  = Object.freeze({
    columns: ['GradeNumber', 'LunchPeriod', 'SortOrder', 'PromoteToGradeNumber'],
    formatting: ['varchar(5)', 'smallint', 'smallint', 'varchar(5)']
})

module.exports.Transaction  = Object.freeze({
    columns: ['TransactionID', 'StudentID', 'FoodID', 'TransactionDate', 'TransactionType', 'Quantity', 'Amount'],
    formatting: ['int', 'int', 'int', 'datetime', 'varchar(10)', 'tinyint', 'money']
})
