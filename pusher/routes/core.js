const router = require("express").Router();
const coreController = require("../controllers/coreController");

router.get("/dashboard", coreController.getDashboard);
router.post("/event", coreController.emitEvent);

module.exports = router;
