const mongoose = require('mongoose')

const DocumentsPersonnelSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('DocumentsPersonnel', DocumentsPersonnelSchema)

