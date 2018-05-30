var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    ent = require('ent'); // Permet de bloquer les caractères spéciaux de HTML

// Chargement du fichier list.ejs affiché au client
app.get('/', function (req, res) {
  res.render(__dirname + '/list.ejs');
})

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
	
	//initialisation de tableau s'il n'existe pas
	if (typeof(todoList) == 'undefined') {
        todoList = [];
    }
	io.sockets.emit('live_list', todoList);//Envoyer le tableau au nouveau client

	// Quand le serveur reçoit un signal de création d'un nouveau todo
    socket.on('new_todo', function (todo) {
		 todo = ent.encode(todo);
		todoList.push(todo); //ajout de todo dans le tableau
		io.sockets.emit('live_list', todoList);//renvoyer le tableau à tous les clients
    });
	
	// Quand le serveur reçoit un signal de suppression d'un todo    
    socket.on('delete_todo', function (idTodo) {
		if (todoList[idTodo] != 'undefined'){
			todoList.splice(idTodo, 1); //suppression de todo du tableau
		}
		io.sockets.emit('live_list', todoList);//renvoyer le tableau à tous les clients
    });
});

server.listen(8080);