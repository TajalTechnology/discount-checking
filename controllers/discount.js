const { Op } = require("sequelize");
const Discount = require('../models').Discount;
const { randomNumber } = require('../utils/functions/randomNumber');
const { validationResult } = require('express-validator');
const { _response } = require('../utils/responce');


exports.add = async (req, res) => {
    const { percentage, expireDate, isActive } = req.body;

    try {
        const discount = await Discount.create({
            discountCode: randomNumber(),
            percentage,
            expireDate,
            isActive,
        });

        if (!discount) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ discount });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const { percentage, expireDate, isActive } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* UPDATE */
        const discount = await Discount.update({ percentage, expireDate, isActive }, condition);
        if (!discount) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const discount = await Discount.destroy(condition);

        if (discount === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (discount === 0) {
            return res.status(404).json({ message: _response.emptyList });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDetails = async (req, res) => {

    const id = req.params.id;
    const query = { where: { id: id } }

    try {
        const discount = await Discount.findOne(query);
        if (discount) {
            return res.status(200).json({ address });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};