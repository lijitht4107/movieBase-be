import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://lijiththazhathethil:4mx12uEQzSOmHpe4@cluster0.7vvl4.mongodb.net/"
  );
  console.log('connected db');
}
export default main;
