import pool from "../config/db";
import bcrypt from 'bcrypt';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

const createUser = async (user: User) => {
  try {
    const { firstName, lastName, email, password:rawPassword } = user;

    const hashPassword = await bcrypt.hash(rawPassword, 10);
    
    await pool.query('CALL createUser($1, $2, $3, $4)', [firstName, lastName, email, hashPassword])
  } 
  
  catch(err) {
   throw err;
  }
}

const checkUser = async (email: string) => {
    try {
       const result =  await pool.query('SELECT checkUserExist($1)', [email]);
       return result.rows[0].checkuserexist;
    }

    catch(err) {
      throw err;
    }
}

const extractUserInfo = async (_email: string) => {
  try {
     const result = await pool.query('SELECT getUserInfoByEmail($1)', [_email]);

     const info = result.rows[0].getuserinfobyemail; //(jhonwell,Espanola,jhon@gmail.com,123)
     const [firstName, lastName, email, password] 
       = info.slice(1, info.length - 1).split(',');
     
     return ({ firstName, lastName, email, password })
    }

  catch(err) {

  }
}

export { createUser, checkUser, extractUserInfo }; 