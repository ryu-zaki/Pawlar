import pool from "../config/db";
import bcrypt from 'bcrypt';
import { generateOTP } from "../utils/otp.helper";
import { sendOTPEmail } from '../utils/email.helper';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null
}

const createUser = async (user: User) => {
  try {
    const { firstName, lastName, email, password: rawPassword } = user;
    

    if (!!rawPassword) {
       const hashPassword = await bcrypt.hash(rawPassword, 10);
       await pool.query('CALL create_user($1, $2, $3, $4)', [firstName, lastName, email, hashPassword]);
       await createOtpFields(email);
       
       
    
    } else {
       /* OAUTH */
       await pool.query('CALL create_user($1, $2, $3, $4)', [firstName, lastName, email, null]);
       await pool.query("CALL set_verified_by_email($1, $2)", [email, 1]);
      }   

   
  }

  catch (err) {
    throw err;
  }
}

const checkUser = async (email: string) => {
  try {
    const result = await pool.query('SELECT checkUserExist($1)', [email]);
    return result.rows[0].checkuserexist;
  }

  catch (err) {
    throw err;
  }
}

const extractUserInfo = async (_email: string) => {
  try {
    const result = await pool.query('SELECT getUserInfoByEmail($1)', [_email]);

    const info = result.rows[0].getuserinfobyemail; //(jhonwell,Espanola,jhon@gmail.com,123)
    const [firstName, lastName, email, password, verification_code]
      = info.slice(1, info.length - 1).split(',');

    return ({ firstName, lastName, email, password, verification_code })
  }

  catch (err) {
     console.log(err);
  }
}

const updateUserPassword = async (email: string, newPassword: string) => {
  try {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('CALL updateUserPasswordByEmail($1, $2)', [email, hashPassword]);
  } catch (err) {
    throw err;
  }
};

const createOtpFields = async (email: string) => {
  try {
  const code = generateOTP();
  const verification_code = await bcrypt.hash(code, 10);
  const last_otp_sent_at = (new Date()).toISOString();
  const verification_expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10mins
     
     await sendOTPEmail(email, code);
     console.log("Email sent.");
     await pool.query("CALL createOTPcredentials($1, $2, $3, $4)", 
      [email, verification_code, last_otp_sent_at, verification_expires_at])
   }

   catch(err) {
    throw err
   }
}

const updateValidateField = async (email:string, numericValue: string)  => {
   try {
    await pool.query('CALL set_verified_by_email($1, $2)', [email, numericValue])
   } 
   catch(err) {
    throw err;
   }
}

export { createUser, checkUser, extractUserInfo, updateUserPassword, createOtpFields, updateValidateField }; 