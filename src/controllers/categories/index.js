const models = require('../../models');

const allAction = async (req, res) => {

    try {
        const categories = await models.Category.find({});

        if (categories.length === 0) {
            res.send({
                ok: false,
                message: 'Not Category'
            });
        }

        res.send(categories);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Not Category'
        });
    }
}

const createAction = async (req, res) => {
    const title = req.body.title.trim();

    try {
        await models.Category.create({
            title,
        });

        res.send({
            ok: true,
            message: 'Category created'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Category not create'
        });
    }
}

const singleAction = async (req, res) => {
    const id = req.params.id.trim();
    const product = req.query.products !== undefined;

    try {
        const category = await models.Category.findById(id);

        if (product) {
            const products = await models.Product.find({
                category: category._id
            }).populate('category');

            res.send(products);
        } else {
            res.send(category);
        }

    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Don\'t category'
        });
    }
}

const updateAction = async (req, res) => {
    const id = req.params.id.trim();
    const title = req.body.title.trim();

    try {
        await models.Category.update({
            _id: id,
        }, {
            title
        });

        res.send({
            ok: true,
            message: 'Category edit'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            error: 'Category not edit'
        });
    }
}

const deleteAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        await models.Category.remove({
            _id: id
        });

        res.send({
            ok: true,
            message: 'Category delete'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            error: 'Category not delete'
        });
    }
}

module.exports = {
    allAction,
    createAction,
    singleAction,
    updateAction,
    deleteAction
}