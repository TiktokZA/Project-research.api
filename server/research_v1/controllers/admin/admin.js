import db from "../../db/DBcon.js";
import AutoScrap from "../../scrapping/index.js";
import { gettimescrap } from "../../scrapping/index.js";

class adminController {
    static getlistadmin = async function (req, res, next){
        db.query(`SELECT * FROM admin`, (error, results, fields) => {
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "professor is empty";
            }else {
                massage = "professor is Success";
            }
            return res.send(results);
        })
        
    }
    static getdataadmin = async function (req, res, next){
        const { userID } = req.user;
        db.query(`SELECT * FROM admin WHERE ID_admin = ${userID}; `, (error, results, fields) => {
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "professor is empty";
                return res.status(400).send({data : null , msg : massage});
            }else {
                massage = "professor is Success";
                return res.status(200).send({data : results , msg : massage});
            }
            
        })
        
    }
    static updatedata = async function (req, res, next) {
        const { userID } = req.user;

        console.log(userID);
        const { title, firstname, lastname, email, phone, position, password } = req.body;
        const form_data = {
            title_name : title,
            firstname_professor : firstname,
            lastname_professor : lastname,
            Email: email,
            Phone_number: phone,
            Position: position,
            Password: password
        }
        db.query(`UPDATE professor SET ? WHERE ID_professor = ${userID } `,form_data, 
        (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0 || !results){
                massage = "UPDATE professor is faile";
            }else {
                massage = "UPDATE professor is Success";
            }
            // return res.send(massage);
            return res.send({error: false, data: results.affectedRows, massage: massage});
        })
    }

    static settimescrap = async function (req, res, next) {
        const { userID } = req.user;
        console.log("admin id =>",userID);
        const { Settime} = req.body;
        
        AutoScrap.Timescrap(Settime);
        return res.status(200).send({error: false, WHO: userID, Timeset: Settime});
    }

    static gettimescrap = async function (req, res, next) {
        const { userID } = req.user;
        console.log("admin id =>",userID);
        let msg= gettimescrap() ;
        console.log("msg => ",msg)
        return res.status(200).send({error: false, WHO: userID, Timeset: msg});
    }

}

export default adminController;

