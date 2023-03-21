
import db from "../db/DBcon.js";
import authService from "../services/auth.js";
// import authModel from "../models/User.js";
import bcrypt from 'bcryptjs';
// import expressValidator from "express-validator";/
import {  validationResult } from "express-validator";


// const { validationResult } = expressValidator;

class AuthController {

    static proLogin = async  function (req, res, next){
        const {email , password} =req.body;

        if( !(email && password)){
            res.status(400).send("All input is required");
        }
        db.query(`SELECT * FROM professor WHERE Email = "${email}"`,async (error, results) => {
            if (error)
                throw error;
            if (results === undefined || results.length == 0) {
                return res.status(401).send({
                    msg: 'Email not found'
                });
            }
            if(password == results[0].Password){
                const userID = results[0].ID_professor;
                // console.log(userID);
                const accessToken = await authService.getToken({userID ,username: email, Role:"Professor"});
                // console.log(token);
                // res.status(200).send({ user, ...token });
                return res.status(200).send({
                    msg: 'Logged in!',
                    accessToken,
                    user: results[0],
                    Role:"Professor"
                });
            }else{
                return res.status(401).send({
                    msg: 'Email or password is incorrect!'
                });
            }
        });
    }

    static adminLogin = async  function (req, res, next){
        const {username , password} =req.body;

        if( !(username && password)){
            res.status(400).send("All input is required");
        }
        db.query(`SELECT * FROM admin WHERE name_admin = "${username}"`,async (error, results) => {
            if (error)
                throw error;
            if (results === undefined || results.length == 0) {
                return res.status(401).send({
                    msg: 'username not found'
                });
            }
            if(password == results[0].password){
                const userID = results[0].ID_admin;
                // console.log(userID);
                const accessToken = await authService.getToken({userID ,username, Role : "Admin"});
                // console.log(token);
                // res.status(200).send({ user, ...token });
                return res.status(200).send({
                    msg: 'Logged in!',
                    accessToken,
                    user: results[0],
                    Role : "Admin"
                });
            }else{
                return res.status(401).send({
                    msg: 'Email or password is incorrect!'
                });
            }
        });
    }

    static userLogin = async  function (req, res, next){
        const {username , password} =req.body;

        if( !(username && password)){
            res.status(400).send("All input is required");
        }
        db.query(`SELECT * FROM users WHERE username = "${username}";`, async (error, results) => {
            if (error)
                throw error;
            if (results === undefined || results.length == 0) {
                return res.status(401).send({
                    msg: 'username not found'
                });
            }
            bcrypt.compare(
                password,
                results[0].password,
                async (bErr, bResult) => {
                  // wrong password
                  if (bErr) {
                    throw bErr;
                    
                  }
                  if (bResult) {
                    const userID= results[0].ID_user;
                    const accessToken = await authService.getToken( {userID , username ,Role:"User" } );
                    
                    return res.status(200).send({
                      msg: `You are logged in!`,
                      accessToken,
                      user: results[0],
                    });
                  }
                  return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                  });
                }
            );
        });
    }

    static userRegister = async function (req, res, next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const {username, email, firstname, lastname,  Phone_number,password} = req.body;
        db.query(
            `SELECT * FROM users WHERE Email = "${ email }" OR username = "${username}";`,
            (err, result) => {
                if (result.length > 0) {
                    return res.status(409).send({
                        msg: 'This user is already in use!'
                    });
                } else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({
                            msg: err
                            });
                        } else {
                            const form_data = {
                                username : username,
                                password : hash,
                                first_name: firstname,
                                last_name : lastname,
                                Email: email,
                                phonenumber: Phone_number,
                            }
                            // has hashed pw => add to database
                            db.query(
                            `INSERT INTO users SET ?;`,form_data ,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registerd with us!',
                                data: result

                                });
                            }
                            );
                        }
                    });
                } 
            }
        );
        next();
    }
    static resetpassword = async function (req, res, next) {
        const { username, oldpassword, newpassword }= req.body;

        db.query(
            `SELECT * FROM users WHERE username = "${username}"; `,
            (err, results) =>{
                if(err) throw err;
                if(results.length == 0 || ! results ){
                    return res.status(409).send({
                        msg: 'not have this User !!'
                    });
                }else{
                    const respwd = bcrypt.compare(oldpassword, results[0].password);
                    if(!respwd){
                        return res.status(400).send({
                            msg: 'password not mathch !!'
                        });
                    }
                    const hashpassword = bcrypt.hashSync(newpassword, 10);
                    db.query(
                        `UPDATE users SET password = "${hashpassword}"  WHERE username = "${username }";`,
                        (error, Res) =>{
                            if (error){
                                throw error;
                            }
                            return res.status(201).send({
                                msg: 'Your password reset Success!!',
                                data: Res
                            });
                        }
                    );
                }
            }
        );

    }

}


export default AuthController;