import { connect } from 'mongoose';

const mongoURI = "mongodb://127.0.0.1:27017/CMS";



const connectToMongo = async (): Promise<void | string> => {
    try {
        await connect(mongoURI);
        console.log('Connected to the database');
    } catch (error) {
        return `Error occurred at MongoDB connection: ${error}`;
    }
};

export default connectToMongo;



