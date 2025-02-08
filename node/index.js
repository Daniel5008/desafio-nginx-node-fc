const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people (name) VALUES ('UserName');`;
connection.query(sql);

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config);
    const sql = `SELECT name FROM people;`;

    connection.query(sql, (err, results) => {
        let html = '<h1>Full Cycle Rocks!</h1>';

        if (err) {
            html += '<h1>Erro ao buscar nomes!</h1>';
            html += err;
        }

        html += '<ul>';
        results.forEach(row => {
            // console.log(row);
            html += '<li>' + row.name + '</li>';
        });
        html += '</ul>';

        res.send(html);
    });
    
})

app.listen(port, () => {
    console.log('Rodando na porta 3000!');
})


connection.end();