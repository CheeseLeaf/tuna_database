var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {date, average_price, trade_volume}=req.body;
    sql = "INSERT INTO tuna (date,average_price, trade_volume) VALUES (?, ?, ?)";
    db.run(sql, [date, average_price, trade_volume], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });

    return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM tuna";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;