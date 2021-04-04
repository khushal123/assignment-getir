const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  cprocess.exit(0)
});
