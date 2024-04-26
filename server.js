const { createServer } = require('http');
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`A client Connected ${socket.id}`)
    socket.on("join-room", (inviteCode , callback) => {
        socket.join(inviteCode);
        // Send acknowledgment back to the client
        callback({ success: true });    
    });
    socket.on('send-key',(room ,newValue )=>{
        socket.to(room).emit('receive-key' , newValue);
    })
    socket.on('leave-room', (inviteCode , callback) =>{
      socket.leave(inviteCode);
      // Send acknowledgment back to the client
      callback({success : true});
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});