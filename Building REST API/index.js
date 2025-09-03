const express = require('express');
const fs = require('fs');
const users = require('./USER_DATA.json');
const { json } = require('stream/consumers');

const app = express();
const PORT = 8000;

// middleware
app.use(express.urlencoded({ extended: false }));

// we can render html page also
app.get('/users', (req, res) => {
    const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
      </ul>
    `;
    res.send(html);
})

// sending json data
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (user) {
        return res.json(user);
    }
    return res.send({ "message": "User not found" });
})

app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push({ id: users.length + 1, ...user });
    fs.writeFile('USER_DATA.json', JSON.stringify(users, null, 2), (err) => { });
    return res.send("User created");
})

app.patch('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const user = users.find((u) => u.id === id);
    if (user) {
        Object.assign(user, data);
        fs.writeFile('USER_DATA.json', JSON.stringify(users, null, 2), (err) => { })
        return res.send("User updated")
    }
    return res.send("User not found");
})

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    if (index != -1) {
        users.splice(index, 1);
        fs.writeFile('USER_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if(err){
                return res.send("error in deleting")
            } else {
                return res.send("User deleted");
            }
        })
    } else {
        return res.send("User not found");
    }
})

// we can merge the request like get, patch, delete which or on same route
// app
//     .route("/api/users/:id")
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         return res.json(user);
//     })
//     .patch((req, res) => {
//         // TODO: Edit a user with id
//         return res.json({ status: "pending" })
//     })
//     .delete((req, res) => {
//         // TODO: Delete a user with id
//         return res.json({ status: "pending" })
//     });

app.listen(PORT, () => { console.log(`server started at ${PORT}`) });