import { Connection, Request } from 'tedious';

console.log(process.env.REACT_APP_DATABASE_SCHEMA)
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: process.env.REACT_APP_DATABASE_USER,
      password: process.env.REACT_APP_DATABASE_PASSWORD
    },
    type: "default"
  },
  server: process.env.REACT_APP_DATABASE_SERVER, // update me
  options: {
    database: process.env.REACT_APP_DATABASE_SCHEMA, //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELCTE * FROM Account`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}