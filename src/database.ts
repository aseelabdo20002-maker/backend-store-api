import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const {
POSTGRES_HOST,
POSTGRES_DB ,
POSTGRES_PASSWORD, 
POSTGRES_USER ,
POSTGRES_DB_TEST,
ENV
} = process.env;


let connection!:Pool;

if(ENV === 'test') {
  connection = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  connection = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}





export default connection;


