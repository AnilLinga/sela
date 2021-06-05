
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
    customerId: { type: String, required: true },
    invoiceId: { type: String, required: true },
    createdAt: { type: Number, required: true }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);