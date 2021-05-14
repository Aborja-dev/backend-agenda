const { Schema, model } = require ('mongoose')


const schema = new Schema({
    name: String,
    number: String
})

const Person = model('Person',schema)

module.exports = Person