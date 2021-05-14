const mongoose = require('mongoose')
const { username, password } = require('./password.json')

const urlConnection= `mongodb+srv://${username}:${password}@cluster0.xqmij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(urlConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then (()=>{
        console.log('conexion a base de datos')
    })
    .catch(err=>console.log(err))
    
