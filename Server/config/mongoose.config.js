import mongoose from 'mongoose'


const uri = `mongodb+srv://rang1nol:password1!@generalstore.5m5sn.mongodb.net/GeneralStore?retryWrites=true&w=majority`;


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB