const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// fake DB
const messages = [];
const users = [];

// socket.io server
io.on("connection", socket => {
	console.log(`Connected: ${socket.id}`);

	socket.on('add-user', function(data){
      let a = 0;
      if (users.length >0) {
        for (a in users) {
          if (users[a].id != socket.id) {
            users.push({ id: socket.id, name: data.username, coursetema_id:data.coursetema_id, username_id:data.username_id });
          }
        }
      } else {
        users.push({ id: socket.id, name: data.username, coursetema_id:data.coursetema_id, username_id:data.username_id });
      }
      io.emit('update-users', users);
  });

	socket.on('disconnect', function() {
			const indexOfObject = users.findIndex(object => {
			  return object.id === socket.id;
			});
			users.splice(indexOfObject, 1);
      io.emit('update-users', users);
  });

	socket.on('delete-user', function(data) {
			let z=0;
			let index;
			for (z in users){
				if (users[z].username_id === data.username_id) {
					index = z;
					if (index !== undefined) users.splice(index, 1);
				}

			}
			io.emit('update-users', users);
	});

	socket.on("message.chat1", data => {
		console.log({ data });
		messages.push(data);
		io.emit("message.chat1", data);
	});
});

nextApp.prepare().then(() => {
	app.get("/messages/:chat", (req, res) => {
		res.json({ messages });
	});

	app.get("*", (req, res) => {
		return nextHandler(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
