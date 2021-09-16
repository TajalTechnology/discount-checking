const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models').User;
const { _response } = require('../utils/responce');
const { userData } = require('../utils/dataFormat');


exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    const condition = { where: { email: email } };
    const hash = bcrypt.hashSync(password, 10);

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_USER */
        const existingUser = await User.findOne(condition);

        /* CREATE */
        if (!existingUser) {

            const user = await User.create({ userName, email, password: hash });
            if (!user) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.sucess });

        } else { return res.status(406).json({ message: _response.alreadyRegistered }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.signIn = async (req, res) => {
    const { userName, email, password } = req.body;
    const condition = { where: { email: email } };

    try {
        /* EXISTING_USER */
        const existingUser = await User.findOne(condition);

        /* LOGN_WITH_JWT */
        if (existingUser) {
            const userInfo = userData(existingUser);

            if (bcrypt.compareSync(password, existingUser.password)) {
                const token = jwt.sign(userInfo, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: _response.loginSucess,
                    token: "Bearer " + token,
                });
            } else { return res.status(406).json({ message: _response.passWrong }) };

        } else { return res.status(401).json({ message: _response.unAuthorized }) };
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};
