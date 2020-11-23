require("dotenv").config();

const open = require("open");
const sendkeys = require("sendkeys");
const loudness = require("loudness");
const { exec } = require("child_process");

const socket = require("socket.io-client")("http://localhost:8000", {
  query: "id=" + process.env.PHONENUMBER,
});

socket.on("connect", function () {
  console.log("Connected");
});

socket.on("NEW_EVENT", async function (event) {
  if (event.type === "SENDKEYS") {
    sendkeys(event.value);
  } else if (event.type === "PROCESS") {
    exec(event.value);
  } else if (event.type === "LINK") {
    open(event.value);
  } else if (event.type === "VOLUME") {
    console.log("SETTING VOLUME");
    const vol = await loudness.getVolume();
    if (event.value === "UP") {
      if (vol + 5 >= 100) {
        loudness.setVolume(100);
      } else {
        loudness.setVolume(vol + 5);
      }
    } else if (event.value === "DOWN") {
      if (vol - 5 <= 0) {
        loudness.setVolume(0);
      } else {
        loudness.setVolume(vol - 5);
      }
    }
  }
});

socket.on("disconnect", function () {
  console.log("Socket Disconnected!");
});
