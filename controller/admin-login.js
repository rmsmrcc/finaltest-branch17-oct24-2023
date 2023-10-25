const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAdminLogin = (req, res) => {
    res.render('admin-login');
};

exports.postAdminLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const {admin_id, username, userpassword } = req.body;

    // Use placeholders in the SQL query
    const sql = 'SELECT admin_id, username, userpassword FROM adminlogins WHERE admin_id = ? AND username = ? AND userpassword = ?';

    connection.query(sql, [admin_id, username, userpassword], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                req.session.adminusernme = userlogin;
                // Login successful
                res.redirect('/admin/dashboard');
            } else {
                // Login failed
                res.send('Login failed');
            }
        }
        connection.end();
    });
};

