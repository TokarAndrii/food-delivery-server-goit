const fs = require('fs');
const path = require("path");




const usersCreateRouter = (req, res) => {
    const newId = Date.now();
    const { name, phone, email, age } = req.body;
    const user = { name, phone, email, age, id: newId }
    console.log(user, user);

    fs.readFile(
        path.join(__dirname, "../../../db/users/", 'all-users.json'),
        (err, data) => {
            if (err) throw err;
            const allUsers = JSON.parse(data);
            allUsers.users.push(user);

            fs.writeFile(
                path.join(__dirname, "../../../db/users/", 'all-users.json'),
                JSON.stringify(allUsers),
                err => {
                    if (err) throw err;
                    console.log("The file has been saved!");

                    res.status(200);
                    res.json({ users: user, status: "success" });
                    res.end();
                }
            );


        }
    );

}

module.exports = usersCreateRouter;