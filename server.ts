const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, { cors: "*" });
app.use(cors());


io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: recipients, sender: id, text
      })
    })
  })
})


app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join("/images", "images")));

app.get("/getImages", (req, res) => {
  const images = [
    { name: "image1.jpg", url: "/images/image1.jpg" },
    { name: "image2.jpg", url: "/images/image2.jpg" },
    { name: "image3.jpg", url: "/images/image3.jpg" },
    { name: "image4.jpg", url: "/images/image4.jpg" },
    { name: "image5.jpg", url: "/images/image5.jpg" },
    { name: "image6.jpg", url: "/images/image6.jpg" },
    { name: "image7.jpg", url: "/images/image7.jpg" },
  ];
  res.json(images);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
