exports.getDashboard = async (req, res) => {
  res.render("dashboard", {
    layout: false,
  });
};

exports.emitEvent = async (req, res) => {
  console.log(req.body);
  io.to("9842641628").emit("NEW_EVENT", req.body);

  res.json({
    message: "Emitted!",
  });
};
