const models = require('../../models');

const allAction = async (req, res) => {
    const category = req.query.category || false;
    let products
    try {
        if (category) {
            products = await models.Product.find({
                category
            }).populate('category');
        } else {
            products = await models.Product.find({}).populate('category');
        }

        if (products.length === 0) {
            res.send({
                ok: false,
                error: 'No Product'
            });
        }

        res.send(products);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            error: 'No Product'
        });
    }
}

const createAction = async (req, res) => {
    const title = req.body.title.trim();
    const content = req.body.content;
    const amount = parseInt(req.body.amount);
    const categoryId = req.body.category.trim();

    try {
        const category = await models.Category.findById(categoryId);

        try {
            await models.Product.create({
                title,
                content,
                amount,
                category
            });

            res.send({
                ok: true,
                message: 'Product create'
            });
        } catch (error) {
            res.send({
                ok: false,
                message: 'Product not create'
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Not category'
        });
    }
}

const singleAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        const product = await models.Product.findById(id).populate('category');

        res.send(product);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Product not found'
        });
    }
}

const updateAction = async (req, res) => {
    const id = req.params.id.trim();
    const title = req.body.title.trim();
    const content = req.body.content;
    const amount = parseInt(req.body.amount);
    const categoryId = req.body.category.trim();

    try {
        const category = await models.Category.findById(categoryId);

        try {
            await models.Product.update({
                _id: id
            }, {
                title,
                content,
                amount,
                category
            });

            res.send({
                ok: true,
                message: 'Product update'
            });
        } catch (error) {
            res.send({
                ok: false,
                message: 'Product not update'
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Not category'
        });
    }
}

const deleteAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        await models.Product.remove({
            _id: id
        });

        res.send({
            ok: true,
            message: 'Product delete'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Product not delete'
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