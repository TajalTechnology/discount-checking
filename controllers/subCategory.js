const { validationResult } = require('express-validator');
const SubCategory = require('../models').SubCategory;
const { _response } = require('../utils/responce');


exports.add = async (req, res) => {
    const { subCategory, discountId, categoryId } = req.body;
    const condition = { where: { subCategory: subCategory } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_TITLE */
        const existingSubCategory = await SubCategory.findOne(condition);

        /* CREATE */
        if (!existingSubCategory) {
            const createSubCategory = await SubCategory.create({ subCategory, discountId, categoryId });
            if (!createSubCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ createSubCategory });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const { subCategory, discountId, categoryIdryId } = req.body;
    const id = req.params.id;
    const condition1 = { where: { subCategory: subCategory } };
    const condition2 = { where: { id: id } };

    try {
        /* CHECK_VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_SUB_CATEGORY_TITLE */
        const existingSubCategory = await SubCategory.findOne(condition1);

        /* UPDATE */
        if (!existingSubCategory || (existingSubCategory && existingSubCategory.id == id)) {
            const subCategory = await SubCategory.update({ subCategory, discountId, categoryIdryId }, condition2);
            if (!subCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ subCategory: _response.update });
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
        /* DELETE_SUB_CATEGORY */
        const subCategory = await SubCategory.destroy(condition);

        if (subCategory === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (subCategory === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    }
};