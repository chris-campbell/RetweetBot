const express = require("express");
const router = express.Router();

const twitterRulesController = require("../controllers/twitterRulesController");

router.get("/getRules", twitterRulesController.getRules);
router.post("/setRules", twitterRulesController.setRules);
router.post("/deleteRules", twitterRulesController.deleteRules);

module.exports = router;
