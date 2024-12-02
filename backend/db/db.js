import mongoose from "mongoose";

function connectToDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));
}

export default connectToDb;
