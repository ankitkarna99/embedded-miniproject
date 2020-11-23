const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileUpload = require("express-fileupload");

app.use(fileUpload());

const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("keyboard cat does meow"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    secret: "mydamnsecretohhgosh",
  })
);

const hbs = require("express-handlebars");
app.engine("hbs", hbs({ extname: "hbs" }));
app.set("view engine", "hbs");

app.use(flash());

app.use((req, res, next) => {
  const errorMessages = req.flash("error").map((msg) => {
    return { type: "error", message: msg };
  });
  const successMessages = req.flash("success").map((msg) => {
    return { type: "success", message: msg };
  });

  res.locals.flash = [...successMessages, ...errorMessages];
  next();
});

// const auth = require("./middlewares/auth");

// app.use("/", auth, require("./routes/index"));
app.use("/", require("./routes/core"));

app.use(express.static("./public"));

module.exports = app;
