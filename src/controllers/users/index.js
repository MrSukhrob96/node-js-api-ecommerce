const models = require('../../models');

const allAction = async (req, res) => {
    try {
        const users = await models.User.find({});

        if (users.length === 0) {
            res.send({
                ok: false,
                error: 'No User'
            });
        }

        res.send(users);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            error: 'No User'
        });
    }
}

const createAction = async (req, res) => {
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const phone = req.body.phone.trim();
    const password = req.body.password.trim();

    try {
        await models.User.create({
            name,
            email,
            phone,
            password
        });

        res.send({
            ok: true,
            message: 'User create'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'User not create'
        });
    }
}

const singleAction = async (req, res) => {
    const id = req.params.id.trim();
    const order = req.query.orders !== undefined;

    try {
        const user = await models.User.findById(id);

        if (order) {
            const orders = await models.Order.find({
                user: user._id
            }).populate('user').populate('products');

            res.send(orders);
        } else {
            res.send(user);
        }
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'User not found'
        });
    }
}

const updateAction = async (req, res) => {
    const id = req.params.id.trim();
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password.trim();

    try {
        await models.User.update({
            _id: id
        }, {
            name,
            email,
            phone,
            password
        });

        res.send({
            ok: true,
            message: 'User update'
        });
    } catch (error) {
        res.send({
            ok: false,
            message: 'User not update'
        });
    }
}

const deleteAction = async (req, res) => {
    const id = req.params.id.trim();

    try {
        await models.User.remove({
            _id: id
        });

        res.send({
            ok: true,
            message: 'User delete'
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'User not delete'
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