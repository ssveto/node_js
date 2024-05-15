const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Member = require("../models/member");


exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};

exports.sign_up_get = (req, res) => res.render('sign-up-form');

exports.sign_up_post = [
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("family_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Family name must be specified.")
        .isAlphanumeric()
        .withMessage("Family name has non-alphanumeric characters."),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Password must be given."),
    body('confirm_password')
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Password is not same.")
        .custom((value, { req }) => {
            return value === req.body.password;
        }),
    
    body("email")
        .isEmail()
        .withMessage("Email not correct"),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err);
            } else {
                const member = new Member({
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    email: req.body.email,
                    password: hashedPassword
                });

                if (!errors.isEmpty()) {
                    // There are errors. Render form again with sanitized values/errors messages.
                    res.render("sign-up-form", {
                        title: "Sign up",
                        member: member,
                        errors: errors.array(),
                    });
                    return;
                    } else {
                    const result = await member.save();
                    res.redirect("/");
                    }
            }
            
            
        })

    })
]