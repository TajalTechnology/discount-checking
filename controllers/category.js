const Category = require('../models').Category;
const { validationResult } = require('express-validator');
const { _response } = require('../utils/responce');


exports.add = async (req, res) => {
    const { category, discountId } = req.body;
    const condition = { where: { category: category } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_CATEGORY */
        const existingCategory = await Category.findOne(condition);

        /* CREATE */
        if (!existingCategory) {
            const createCategory = await Category.create({ category, discountId });
            if (!createCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ createCategory });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const { category, discountId } = req.body;
    const id = req.params.id;
    const condition1 = { where: { category: category } };
    const condition2 = { where: { id: id } };

    try {
        /* CHECK_VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_CATEGORY_TITLE */
        const existingCategory = await Category.findOne(condition1);

        /* UPDATE */
        if (!existingCategory || (existingCategory && existingCategory.id == id)) {
            const createCategory = await Category.update({ category, discountId }, condition2);
            if (!createCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ category: _response.update });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

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
        const category = await Category.destroy(condition);

        if (category === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (category === 0) {
            return res.status(404).json({ message: _response.empty });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [{ model: SubCategory }],
    };

    try {
        const category = await Category.findOne(condition)
        if (category) {
            return res.status(200).json({ category });
        } else { return res.status(404).json({ message: _response.empty }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};


