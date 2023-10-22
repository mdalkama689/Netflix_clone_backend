import app from "./app.js";
import connectToDb from "./config/db.connection.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Port is running at localhost://http${PORT}`);
});
