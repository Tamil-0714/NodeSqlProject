const { log } = require("console");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const connector = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1967",
  database: "main",
});

connector.connect((err) => {
  if (err) {
    log(err);
  } else log("connected");
});
app.use(express.json());
app.use(express.static("public"));
app.get("/contactInfo", (req, res) => {
  connector.query("select * from person", (err, entity) => {
    if (err) console.error(err);
    else {
      res.json(entity);
    }
  });
});
app.post("/uploadData", (req, response) => {
  const data = req.body;
  console.log(data);
  const Name = data.Name;
  const Age = data.Age;
  const Contact = data.Contact;
  connector.query(
    `
    insert into person(Name,Age,Contact) values ('${Name}', ${Age}, ${Contact});`,
    (err, res) => {
      if (err) throw err;
      console.log(res);
      response.json(res);
    }
  );
});
app.listen(5500, () => {
  log("port at 5500");
});
