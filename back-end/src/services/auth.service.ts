import pool from "../config/db";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

const createUser = async (user: User) => {
  try {
    const { firstName, lastName, email, password } = user;

    await pool.query('CALL createUser($1, $2, $3, $4)', [firstName, lastName, email,password])
  } 
  
  catch(err) {
   throw err;
  }
}

const checkUser = async (email: string) => {
    
    try {
       
    }

    catch(err) {
      throw err;
    }

}

export { createUser, checkUser }; 