import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URL||"mongodb+srv://lijiththazhathethil:4mx12uEQzSOmHpe4@cluster0.7vvl4.mongodb.net/",{
      useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
    }
  );
  console.log('connected db');
}
export default main;
