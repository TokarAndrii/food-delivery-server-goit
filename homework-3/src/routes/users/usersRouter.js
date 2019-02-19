const allUsersJson = require('../../../db/users/all-users.json');

const usersRouter = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: "success", users: allUsersJson }));
    res.end();
}

module.exports = usersRouter;