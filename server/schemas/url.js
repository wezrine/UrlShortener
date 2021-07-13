const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlInput: String,
    slug: String
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url