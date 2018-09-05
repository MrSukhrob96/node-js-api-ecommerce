const models = require('../../models');

const allAction = async (req, res) => {
    const user = req.query.user || false;
    let orders = [];
    try {
        if (!user) {
            orders = await models.Order.find({}).populate('products').populate('user');
        } else {
            orders = await models.Order.find({
                user
            }).populate('products').populate('user');
        }

        if (orders.length === 0) {
            res.send({
                ok: false,
                error: 'No Order'
            });
        }

        res.send(orders);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            error: 'No Order'
        });
    }
}

const createAction = async (req, res) => {
    const products = req.body.products;
    const total = parseInt(req.body.total);
    const user = req.body.user.trim();
    let uid = 0;

    while (true) {
        let id = Math.floor(Math.random() * 10000000);

        try {
            let order = await models.Order.find({
                uid: id
            });

            if (order.length === 0) {
                uid = id;
                break;
            }
        } catch (error) {
            uid = id;
            break;
        }
    }

    try {
        await models.Product.find({
            _id: {
                $in: products
            }
        });
        await models.User.findById(user);
        await models.Order.create({
            uid,
            products,
            total,
            user
        });

        res.send({
            ok: true,
            message: 'Order create'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Order not create'
        });
    }
}

const singleAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        const user = await models.Order.findById(id).populate('products').populate('user');

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'User not found'
        });
    }
}

const updateAction = async (req, res) => {
    const products = req.body.products;
    const total = parseInt(req.body.total);
    const user = req.body.user.trim();
    const uid = req.body.uid.trim();

    try {
        await models.Product.find({
            _id: {
                $in: products
            }
        });
        await models.User.findById(user);
        await models.Order.create({
            uid,
            products,
            total,
            user
        });

        res.send({
            ok: true,
            message: 'Order Update'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Order not update'
        });
    }
}

const deleteAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        await models.Order.remove({
            _id: id
        });

        res.send({
            ok: true,
            message: 'Order delete'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Order not delete'
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