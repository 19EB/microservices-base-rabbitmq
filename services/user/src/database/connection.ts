import config from '../config';

const connect = async () => {
    console.log('Connecting to DB');
    const dbURI = config.DB;
    if(!dbURI || dbURI.length < 1) {
        console.log('No database URI found');
        return;
    }
    // Handle database connection here
}

export default connect;