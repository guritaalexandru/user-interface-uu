function loginAccount(username, password){
    // Takes in a username and password, checks if it is logged in then returns the user details
    // if (username == '' || password == ''){
    //     alert("Invalid Input!!!");
    // }
    let allUsers = allUserNames();
    console.log(allUsers);

    if (allUsers.includes(username)){
        // if the user exists
        console.log("account found");
        let accountDetails = userDetails(username); // get the password
        console.log(accountDetails);
        
        if (accountDetails[0].password == password){
            return accountDetails[0];
        }
    }
    
    
}


// Taken from loader

function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        nameCollect.push(DB.users[i].username);
    }
    return nameCollect;
}


function userDetails(userName) {
    var userCollect = [];
    var userID;
    var userIndex;
    var account;

    // First we find the user ID of the selected user. We also save the index number for the record in the JSON
    // structure.
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
            userIndex = i;
        };
    };

    // We get the current account status from another table in the database, account. We store this in
    // a variable here for convenience.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            account = DB.account[i].creditSEK;
        }
    };

    // This is the way to add the details you want from the db into your own data structure.
    // If you want to change the details, then just add or remove items accordingly below.
    userCollect.push(
        {
            user_id : DB.users[userIndex].user_id,
            username : DB.users[userIndex].username,
            firstName : DB.users[userIndex].first_name,
            lastName : DB.users[userIndex].last_name,
            email : DB.users[userIndex].email,
            password : DB.users[userIndex].password
        }
    );

    return userCollect;
}


window.loginAccount = loginAccount;