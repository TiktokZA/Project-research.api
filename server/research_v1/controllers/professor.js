// import professorMD from "../models/professorModel.js";
import db from "../db/DBcon.js";
import bcrypt from 'bcryptjs';
// const model = new professorMD();
class professorController {
    static getdata = async function (req, res, next){
        const { userID } = req.user;
        // console.log(proID);
        db.query(`SELECT * FROM professor WHERE ID_professor = ${userID}`
        , (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "professor is empty";
            }else {
                massage = "professor is Success";
            }
            // console.log(results[0].firstname_professor)
            // return res.send(results);
            return res.send({error: false, data: results, massage: massage});
        }) 
    }
    static deletedata = async function (req, res, next) {
        const { proID } = req.body;
        db.query(`DELETE FROM professor WHERE ID_professor = ${proID}`, (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "delete faile";
            }else {
                massage = "delete Success";
            }
            return res.send(massage);
            // return res.send({error: false, data: results, massage: massage});
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
        await db.query(`
        UPDATE professor SET 
            ${title ? `title_name = '${title}',`:``}
            ${firstname ? `firstname_professor = '${firstname}',`:``}
            ${lastname ? `lastname_professor = '${lastname}',`:``}
            ${email ? `Email = '${email}',`:``}
            ${phone ? `	Phone_number = '${phone}',`:``}
            ${position ? `Position = '${position}',`:``}
            ${password ? `Password = '${password}',`:``}
            update_date = now()
        WHERE ID_professor = ${userID } `,form_data, 
        async (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0 || !results){
                massage = "UPDATE professor is faile";
            }else {
                massage = "UPDATE professor is Success";
            }
            // return res.send(massage);
            return await res.send({error: false, data: results.affectedRows, massage: massage});
        })
    }
    static creatdata = async function (req, res, next){
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
        db.query(`INSERT INTO professor SET ? ;`,form_data, 
        (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "ADD professor is faile";
            }else {
                massage = "ADD professor is Success";
            }
            return res.send({massage: massage, data: results });
            // return res.send({error: false, data: results, massage: massage});
        })
    }
}

export default professorController;