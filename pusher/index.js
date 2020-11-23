const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/main", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

//Bring in the models
require("./models/User");

const app = require("./app");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

io = require("socket.io")(server);

io.use(async (socket, next) => {
  try {
    const id = socket.handshake.query.id;
    socket.id = id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.id);
  socket.join(socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
  });
});
