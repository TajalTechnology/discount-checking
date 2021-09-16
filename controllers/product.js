const Product = require('../models').Product;
const Discount = require('../models').Discount;
const Category = require('../models').Category;
const SubCategory = require('../models').SubCategory;

const { validationResult } = require('express-validator');
const { _response } = require('../utils/responce');

exports.add = async (req, res) => {
    const { productName, price, discountId, subCategoryId } = req.body;

    try {
        /* CREATE */
        const product = await Product.create({ productName, price, discountId, subCategoryId });
        if (!product) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ product });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const { productName, price, discountId, subCategoryId } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* UPDATE */
        const category = await Category.update({ category, discountId }, condition);
        if (!category) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ category: _response.update });

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
        };
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [
            { model: Discount },
            {
                model: SubCategory,
                include: [
                    { model: Category, include: [{ model: Discount }] },
                    { model: Discount },
                ]
            },
        ],
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


