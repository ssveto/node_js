var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");
const member = require("../models/member");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/sign-up", (req, res) => res.render('sign-up-form'));

router.post("/sign-up", async (req, res, next) => {

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        } else {
            const member = new Member({
                username: req.body.username,
                password: hashedPassword
            });
            const result = await member.save();
            res.redirect("/");
        }
        
    });

});

module.exports = router;
