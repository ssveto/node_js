var express = require('express');
var router = express.Router();

const index_controller = require("../controllers/indexController");


/* GET home page. */
router.get('/', index_controller.index_get); 

router.post('/', index_controller.index_post); 


router.get("/login", index_controller.login_get);

router.post("/login", index_controller.login_post);

router.get("/sign-up", index_controller.sign_up_get);

router.post("/sign-up", index_controller.sign_up_post);

module.exports = router;
