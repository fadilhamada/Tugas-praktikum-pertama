const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connection')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.query("SELECT * FROM user", (error, result) => {
        if(error) throw error
        res.status(200).json({
            data: result,
            message: "Show data"
        })
    });
});

app.post('/', (req, res) => {
    const{ nama, alamat } = req.body
    const sql = `INSERT INTO user (nama, alamat) VALUES ('${nama}', '${alamat}')`
    db.query(sql, (error, result) => {
        if(error) throw error
        if(result.affectedRows){
            res.status(200).json({
                id: result.insertId,
                message: "Insert data"
            })    
        }      
    })
})

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
}); 