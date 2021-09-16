const Product = require('../models').Product;
const Discount = require('../models').Discount;
const Category = require('../models').Category;
const SubCategory = require('../models').SubCategory;
const Invoice = require('../models').Invoice;
const User = require('../models').User;

const { validationResult } = require('express-validator');
const { _response } = require('../utils/responce');

exports.add = async (req, res) => {
    let payableAmmount, finalAmmount, discountPercentage, totalDiscount;
    const { unit, discountCode, productId } = req.body;

    const condition = {
        where: { id: productId },
        include: [
            { model: Discount },
            {
                model: SubCategory, include: [
                    { model: Discount },
                    { model: Category, include: [{ model: Discount }] }
                ]
            },
        ]
    };

    try {
        const product = await Product.findOne(condition);
        if(!product){return res.status(200).json({ message: _response.emptyList })}
        finalAmmount = product.price * unit;
        payableAmmount = finalAmmount;

        /* CHECK_DISCOUNT */
        if (discountCode == product.Discount.discountCode) {
            discountPercentage = product.Discount.percentage;
            totalDiscount = finalAmmount * (discountPercentage / 100);
            payableAmmount = finalAmmount - totalDiscount;
        } else if (discountCode == product.SubCategory.Discount.discountCode) {
            discountPercentage = product.Discount.percentage;
            totalDiscount = finalAmmount * (discountPercentage / 100);
            payableAmmount = finalAmmount - totalDiscount;
        } else if (discountCode == product.SubCategory.Category.Discount.discountCode) {
            discountPercentage = product.Discount.percentage;
            totalDiscount = finalAmmount * (discountPercentage / 100);
            payableAmmount = finalAmmount - totalDiscount;
        };

        /* CREATE */
        const invoice = await Invoice.create({ unit, discountCode, productId, finalAmmount, discountPercentage, totalDiscount, payableAmmount, userId: req.user.id });
        if (!invoice) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ invoice });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.invoiceDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [
            { model: User }
        ]
    };

    try {
        /* VIEW */
        const invoice = await Invoice.findOne(condition);
        if (!invoice) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ invoice });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};