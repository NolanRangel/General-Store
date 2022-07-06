// imprts mongoose
import mongoose from 'mongoose'

const uri = "mongodb+srv://rang1nol:Caliber1nol@generalstore.5m5sn.mongodb.net/GeneralStore?retryWrites=true&w=majority";
// const uri = "mongodb+srv://rang1nol:Caliber1nol@generalstore.5m5sn.mongodb.net/test";


// establishes connection with db
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));



export default mongoose