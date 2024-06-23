const TelegramBot = require('node-telegram-bot-api')

const token = '7065481716:AAFILxvDpuowqpmrY03N4LsrNPbCSp-i5dY';
const webAppUrl = 'https://192.168.1.6';
const bot = new TelegramBot(token, {polling:true});
bot.on('message', async(msg)=>{
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === './start')
        bot.sendMessage(chatId, 'Welcome to ShahCoins')
        await bot.sendMessage(chatId,'Welcome to ShahCoins.!',{
            reply_markup:{
                inline_keyboard:[
                    [{text: 'Play', web_app:{url: webAppUrl}}]
                ]
            }
        })
})

const express = require('express');
const mysql = require('mysql');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

// Function to get the local IP address
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1'; // fallback to localhost
}

// Database connection configuration
const db = mysql.createConnection({
    host: 'database-2.cr8c8mwq0409.eu-north-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Amna123$',
    database: 'my_parsedb'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to RDS database');
});

app.use(express.json());

// Read
app.get('/api/data/:table', (req, res) => {
    const table = req.params.table;

    if (!table) {
        return res.status(400).send('Table name is required');
    }

    const query = 'SELECT * FROM ??';
    db.query(query, [table], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

// Create
app.post('/api/data/:table', (req, res) => {
    const table = req.params.table;
    const data = req.body;

    if (!table || !data) {
        return res.status(400).send('Table name and data are required');
    }

    const query = 'INSERT INTO ?? SET ?';
    db.query(query, [table, data], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }

        const newRecordQuery = 'SELECT * FROM ?? WHERE id = ?';
        db.query(newRecordQuery, [table, results.insertId], (err, newRecord) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send(err);
            }
            res.json(newRecord[0]);
        });
    });
});

// Update
app.put('/api/data/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = parseInt(req.params.id, 10); // Ensure id is an integer
    const data = req.body;

    if (!table || !id || !data) {
        return res.status(400).send('Table name, ID, and data are required');
    }

    const query = 'UPDATE ?? SET ? WHERE id = ?';
    db.query(query, [table, data, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

// Delete
app.delete('/api/data/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = parseInt(req.params.id, 10); // Ensure id is an integer

    if (!table || !id) {
        return res.status(400).send('Table name and ID are required');
    }

    const query = 'DELETE FROM ?? WHERE id = ?';
    db.query(query, [table, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

// Start the server
const localIP = getLocalIPAddress();
app.listen(port, localIP, () => {
    console.log(`Server running on http://${localIP}:${port}`);
});
