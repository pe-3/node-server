function addUser(user, callback) {
    pool.query(
        'INSERT INTO users SET ?',
        user,
        callback
    );
}

module.exports = {
    addUser
}