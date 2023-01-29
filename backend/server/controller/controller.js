var questionDb = require('../model/model')



// create and save new user
exports.create = (req, res)=>{
    console.log(req)
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }
    // console.log(req.body)
    const question = new questionDb({
        questionTitle:req.body.questionTitle,
        options: req.body.options,
        answer: req.body.answer
    })
    // console.log(question)
    question.save(question).then(data =>{
        res.sendStatus(200)
        console.log('Question Created!')
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating a create operation"
        })
    })
}


//retrieve and return all questions
exports.questions= (req, res)=>{
    if(req){
        questionDb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "Error occurred while retriving user information"})
    })}
}