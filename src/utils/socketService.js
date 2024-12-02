const { io } = require("../../index");

const sendNotification = (notification) => {
  if (io) {
    io.emit("new_notification", notification); // Emit to all clients
    console.log("Notification sent to all clients:", notification);
  } else {
    console.error("Socket.io instance is not available");
  }
};

module.exports = { sendNotification };
