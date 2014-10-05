var users = [
	{
		username:'nikhil',
		password:'test'
	}
];

exports.authenticate = function(username,password){
	var length = users.length;
	var user = [];
	for(var i=0; i < length; i++){
		if (username === users[i].username && password === users[i].password){
			user.push(users[i]);
		}
	}
	return user;

};


