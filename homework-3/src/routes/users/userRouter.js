const allUsers = require('../../../db/users/all-users.json')
const userRouter = (req, res) => {
    const { id } = req.params;
    console.log(id, ' id at userRouter')
    if (id) {
        const foundUser = allUsers.users.filter(user => user.id === parseInt(id));

        if (foundUser.length > 0) {
            res.status(200)
            res.json({ users: foundUser, message: "Ok" });
            res.end();
        }

        else {
            res.status(200)
            res.json({ users: foundUser, message: `Not found user with id - ${id}` });
            res.end();
        }
    }
}

module.exports = userRouter;