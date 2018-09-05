const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'Product'
    },
    total: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Order', schema);