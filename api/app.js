const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const mysql = require('mysql2')
const dotenv = require('dotenv')
const md5 = require('md5')
const dateFormat = require('moment')

dotenv.config()

// Database Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    timezone: process.env.DB_TZ
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use(fileUpload());

app.listen(3000, function () {
    console.log('<< CMH ACCOUNTING - API >>')
})

app.get('/dashboard', async (req, res) => {
    try {
        connection.query('SELECT ' +
        '(SELECT SUM(list_total) FROM acc_list) AS total, ' +
        '(SELECT SUM(list_total) FROM acc_list WHERE list_status = 1) AS wait, ' +
        '(SELECT SUM(list_total) FROM acc_list WHERE list_status = 2) AS paid',
            (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.get('/list', async (req, res) => {
    try {
        connection.query('SELECT * , DATE_ADD(list_date_in, INTERVAL list_datedue DAY) AS limit_date ' + 
            'FROM acc_list ' + 
            'LEFT JOIN acc_type ON acc_type.type_id = acc_list.list_acc_type ' + 
            'LEFT JOIN acc_sub_type ON acc_sub_type.sub_id = acc_list.list_acc_sub ' + 
            'LEFT JOIN acc_creditor ON acc_creditor.creditor_id = acc_list.list_creditor ' + 
            'LEFT JOIN acc_status ON acc_status.status_id = acc_list.list_status ',
            (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.get('/creditors', async (req, res) => {
    try {
        connection.query('SELECT * FROM acc_creditor',
            (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.get('/acc_type', async (req, res) => {
    try {
        connection.query('SELECT * FROM acc_type',
            (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.get('/sub_type', async (req, res) => {
    try {
        connection.query('SELECT * FROM acc_sub_type',
            (err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.get('/sub_acc_type/:id', async (req, res) => {
    const id = req.params.id;
    try {
        connection.query('SELECT sub_code,sub_name FROM acc_sub_type ' + 
            'WHERE acc_type_id = ?',
            [id],(err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.post('/create', async (req, res) => {
    const data = req.body;
    const datetime = new Date();
    const hash = md5(data.docno + datetime);
    const myFile = req.files.file;

    if (!req.files.file) {
        return res.status(500).send({ msg: "File Not Found" })
    }else{
        connection.query("INSERT INTO acc_list " +
        " (list_hash,list_year,list_date_in,list_doc_no,list_acc_type,list_acc_sub" + 
        ",list_creditor,list_note,list_doc_item,list_total,list_datedue,list_file,list_create_date) " + 
        " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            hash,
            data.year,
            data.datein,
            data.docno,
            data.iptype,
            data.isubtype,
            data.icreditor,
            data.note,
            data.docitem,
            data.total,
            data.datedue,
            data.docno + '.pdf',
            datetime,
        ],
        (err, results) => {
            if (err) throw err
        })

        myFile.mv(`${__dirname}/public/files/docFiles/${data.docno + '.pdf'}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            console.log('Create Complete : ' + data.docno)
            return res.send({name: myFile.name, path: `/${myFile.name}`});
        });
    }
})

app.get('/list/:hash', async (req, res) => {
    const hash = req.params.hash;
    try {
        connection.query('SELECT * FROM acc_list ' + 
        'LEFT JOIN acc_type ON acc_type.type_id = acc_list.list_acc_type ' + 
        'LEFT JOIN acc_sub_type ON acc_sub_type.sub_id = acc_list.list_acc_sub ' + 
        'LEFT JOIN acc_creditor ON acc_creditor.creditor_id = acc_list.list_creditor ' + 
            'LEFT JOIN acc_status ON acc_status.status_id = acc_list.list_status ' + 
            'WHERE acc_list.list_hash = ?',
            [hash],(err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.post('/list/update/:hash', async (req, res) => {
    const hash = req.params.hash;
    const datetime = new Date();
    try {
        connection.query('UPDATE acc_list SET list_status = 4 , list_cancel_date = ? WHERE list_hash = ?',
            [datetime,hash],(err, result, field) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                }
            res.status(200).json(result)
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

