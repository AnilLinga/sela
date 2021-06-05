var invoiceModal = require('../modals/invoiceModal')
const { Parser, transforms: { unwind } } = require('json2csv');
var fs = require('fs')
var path = require('path');

exports.getData = function (req, res) {
    try {

        invoiceModal.find({
            $and: [{ createdAt: { $gte: Number(req.query.startDate) } }
                , { createdAt: { $lte: Number(req.query.endDate) } }]
        })
            .then((data) => {
                if (data) {
                    //list of columns in output csv file
                    const fields = ['createdAt', 'customerId', 'invoiceId'];
                    const fileName = new Date().getTime();
                    const extension = 'csv';
                    const transforms = [unwind({ paths: [fileName] })];

                    //converting data json to csv format
                    const json2csvParser = new Parser({ fields, transforms });
                    const csvData = json2csvParser.parse(data);
                    fs.writeFile(`./outputFiles/${fileName}.${extension}`, csvData, err => {
                        if (err) {
                          //file written failed
                          console.error(err)
                          return res.status(500).send({ status_code: 500, message: err })
                        }
                        //file written successfully
                        const absFilePath = path.join(__dirname, `../outputFiles/${fileName}.${extension}`);
                        // return res.status(200).sendFile(absFilePath);
                        return res.status(200).send({ status_code: 200, filePath: absFilePath });
                      })
                }
            })
    } catch (Error) {
        console.log('Error', Error)
        res.status(500).send({ status_code: 500, message: Error });
    }

};


exports.addData = function(req, res) {
    try {
        var newInvoice = new invoiceModal(req.body);
        newInvoice.save(function (err, user) {
            console.log(err)
            if (err) return res.status(500).send({ status_code: 500, message: err });
            res.status(200).json(user);
        });

    } catch (Error) {
        console.log('Error', Error)
        res.status(500).send({ status_code: 500, message: Error });
    }
};



