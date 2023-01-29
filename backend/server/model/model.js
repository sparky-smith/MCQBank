const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    questionTitle:{
        type:String,
        require:true
    },
    options:{
        type:Array,
        require:true
    },
    answer:{
        type:String,
        require:true
    }
})

const questionDb = mongoose.model('questionDb', schema);
module.exports = questionDb
