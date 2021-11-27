const DocumentsPersonnel = require('../models/DocumentsPersonnel')

exports.addDocumentsPersonnel = (req, res) => {
    const documentsPersonnel = new DocumentsPersonnel(req.body)

    documentsPersonnel.save((err, documentsPersonnel) => {
        if(err) {
            return res.status('400').json({error: "this service is already existe"})
        }
        res.send(documentsPersonnel)
    })
}

