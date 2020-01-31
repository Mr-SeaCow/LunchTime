module.exports.getStudents = {
    default: `SELECT 
                S.StudentID
                , S.AccountID
                , S.FirstName
                , S.LastName 
                , S.GradeNumber
                , S.AllowChargingLunch
                , S.HotLunchOnly
                , S.Allergies
              FROM 
                dbo.Student S `,
    whereLunch: `INNER JOIN 
                 dbo.Grade G 
              ON 
                 S.GradeNumber = G.GradeNumber
              WHERE 
                 S.IsActive = @InputIsActive AND
                 G.LunchPeriod = @InputLunch `,
    whereGrade: `WHERE 
                    S.IsActive = @InputIsActive AND
                    S.GradeNumber = '@InputGrade' `,
    defaultWhere: `
              WHERE 
                  S.IsActive = @InputIsActive `
}

module.exports.getStudent = {

   default: `SELECT 
               S.StudentID
               , S.AccountID
               , S.FirstName
               , S.LastName 
               , S.GradeNumber
               , S.AllowChargingLunch
               , S.HotLunchOnly
               , S.Allergies
            FROM 
               dbo.Student S 
            WHERE
               S.StudentID = @InputID `
}

module.exports.getStudentAndAccount = {
   default: `SELECT 
               S.StudentID
               , S.AccountID
               , S.FirstName
               , S.LastName 
               , S.GradeNumber
               , S.AllowChargingLunch
               , S.HotLunchOnly
               , S.Allergies
               , A.AccountID
               , A.AccountName
               , A.IsActive
               , A.AccountBalance
               , A.EmailAddress
            FROM 
               dbo.Student S
            INNER JOIN
               dbo.Account A
            ON
               S.AccountID = A.AccountID
            WHERE
               S.StudentID = @InputID `
}

module.exports.getAccount = {
   default: `SELECT 
               A.AccountID
               , A.AccountName
               , A.IsActive
               , A.AccountBalance
               , A.EmailAddress
               , A.CreatedDate
            FROM 
               dbo.Account A
            WHERE
               A.AccountID = @InputID `
}

module.exports.getFood = {
   default: `SELECT 
               F.FoodID
               , F.FoodName
               , F.FoodCategory
               , F.FoodAmount
               , f.IsActive
            FROM 
               dbo.Food F `,
   whereFoodId: 
            `WHERE
               f.IsActive = @InputIsActive AND 
               f.FoodID = @InputID`,
   whereCategory: 
            `WHERE
               f.IsActive = @InputIsActive AND 
               f.FoodCategory = @InputCategory `,
   defaultWhere:  
            `WHERE
               f.IsActive = @InputIsActive `
}