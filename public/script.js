const express = require('express'); //Import express libary
const app = express(); //instance of express ap
const PORT = 3000;

//Serve all static files from the publuc file
app.use(express.static('public'));
//Allow the server to understand the JSON sent from the frontend
app.use(express.json())

//Create temporary in memory objects to sotr assignments for each user
let users = {};

//Make a post that recieves an assignment and atores it for a given user
app.post('/add-assignment', (req, res) => {
    const {username, assignment} = req.body; //Get  data sent from frontend
    if (!users[username]) {
        users[username] = []; //If user doesn't exist create their list
    }
    users[username].push(assignment) //Add the new assignment to their list
    res.json({success: true}); //Senc confirmation back to the frontend
});

//Start the server, and log a message to show its running
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});