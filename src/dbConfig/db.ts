import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

       connection.on('connected',()=>{
        console.log('MONGODB connected')
       })

       connection.on('error',(error)=>{
        console.log('mongodb connection error , try again'+error)
        process.exit()
       })
    } catch (error) {
        console.log("Error while connecting to database, Error: ", error)

    }
}