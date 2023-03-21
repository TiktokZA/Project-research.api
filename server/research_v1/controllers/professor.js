// import professorMD from "../models/professorModel.js";
import db from "../db/DBcon.js";
import bcrypt from 'bcryptjs';
// const model = new professorMD();
class professorController {

    static getalldata = async function (req, res, next){
        // const { userID } = req.user;
        // console.log(proID);
        db.query(`SELECT * FROM professor `
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
            return res.status(200).send({error: false, data: results, massage: massage});
        }) 
    }
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
    static getskill = async function (req, res, next){
        const { id } = req.body;
        // console.log(proID);
        db.query(`SELECT * FROM professor 
        INNER JOIN skill ON skill.ID_professor = professor.ID_professor
        INNER JOIN core_skill ON core_skill.ID_coreskill = skill.ID_coreskill
        WHERE professor.ID_professor = ${id};`
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
    static getAllskill = async function (req, res, next){
        // const { id } = req.body;
        // console.log(proID);
        db.query(`SELECT * FROM professor 
        INNER JOIN skill ON skill.ID_professor = professor.ID_professor
        INNER JOIN core_skill ON core_skill.ID_coreskill = skill.ID_coreskill
        ORDER BY core_skill.ID_coreskill
        ;` 
        , (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "skill is empty";
            }else {
                massage = "skill is Success";
            }
            // console.log(results[0].firstname_professor)
            // return res.send(results);
            return res.send({error: false, data: results, massage: massage});
        }) 
    }
    static getqualification = async function (req, res, next){
        const { id } = req.body;
        // console.log(proID);
        db.query(`SELECT * FROM professor 
        INNER JOIN join_qulification ON join_qulification.ID_professor = professor.ID_professor
        INNER JOIN educational_qualification ON educational_qualification.ID_qualification = join_qulification.ID_qualification
        WHERE professor.ID_professor = ${id};`
        , (error, results, fields)=>{
            if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "qulification is empty";
            }else {
                massage = " get qulification is Success";
            }
            // console.log(results[0].firstname_professor)
            // return res.send(results);
            return res.send({error: false, data: results, massage: massage});
        }) 
    }
    static getdatanotverify = async function (req, res, next){
        const { userID } = req.body;
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

    static deletequalificationbyid = async function (req, res, next) {
        const { userID } = req.user;
        console.log(userID);
        const { qualification_id } = req.body;
        db.query(`DELETE FROM educational_qualification WHERE ID_qualification = ${qualification_id}`, (error, results, fields)=>{
            if (error) throw error ;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "delete faile";
            }else {
                db.query(`DELETE FROM join_qulification WHERE ID_qualification = ${qualification_id} AND ID_professor = ${userID} `, (error, results, fields)=>{
                    if (error) throw error ;
                    let massage = "";
                    if (results === undefined || results.length == 0){
                        massage = "delete faile";
                    }else {
                        massage = "delete Success";
                    }
                    return res.send(massage);
                    // return res.send({error: false, data: results, massage: massage});
                });
                
            }
        
            // return res.send({error: false, data: results, massage: massage});
        });
        
    }

    static deleteskillbyid = async function (req, res, next) {
        const { userID } = req.user;
        console.log(userID);
        const { coreskill_id } = req.body;
        db.query(`DELETE FROM core_skill WHERE ID_coreskill = ${coreskill_id}`, (error, results, fields)=>{
            if (error) throw error ;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "delete faile";
            }else {
                db.query(`DELETE FROM skill WHERE ID_coreskill = ${coreskill_id} AND ID_professor = ${userID} `, (error, results, fields)=>{
                    if (error) throw error ;
                    let massage = "";
                    if (results === undefined || results.length == 0){
                        massage = "delete faile";
                    }else {
                        massage = "delete Success";
                    }
                    return res.send(massage);
                    // return res.send({error: false, data: results, massage: massage});
                });
                
            }
        
            // return res.send({error: false, data: results, massage: massage});
        });
        
    }
    static updatedata = async function (req, res, next) {
        const { userID } = req.user;
        
        console.log(userID);
        const { title, firstname, lastname, email, phone, position, keyword } = req.body;
        const form_data = {
            title_name : title,
            firstname_professor : firstname,
            lastname_professor : lastname,
            Email: email,
            Phone_number: phone,
            Position: position,
            Keyword : keyword
        }
        await db.query(`
        UPDATE professor SET 
            ${title ? `title_name = '${title}',`:``}
            ${firstname ? `firstname_professor = '${firstname}',`:``}
            ${lastname ? `lastname_professor = '${lastname}',`:``}
            ${email ? `Email = '${email}',`:``}
            ${phone ? `	Phone_number = '${phone}',`:``}
            ${position ? `Position = '${position}',`:``}
            ${keyword ? `Keyword = '${keyword}',`:``}
            update_date = now()
        WHERE ID_professor = ${userID } ;`, 
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
    static insertqualification = async function (req, res, next) {
        const { userID } = req.user;
        
        console.log(userID);
        const { qualification } = req.body;
        const form_data = {
            name_qualification : qualification
        }
        let sql = `SELECT * FROM educational_qualification WHERE name_qualification ='${qualification}'`;
        db.query(sql,(error,result)=>{
            if(error) throw error;
            if(result.length == 0){
                db.query(`INSERT INTO educational_qualification SET ? ;`,form_data,
                (err, results, fields)=>{
                    if (err) throw err;
                    let massage = "";
                    if (results === undefined || results.length == 0){
                        massage = "ADD qualification is faile";
                    }else {
                        
                        const skil_id= results.insertId;
                        db.query(`INSERT INTO join_qulification (ID_professor, ID_qualification) VALUES ( ${userID} , ${skil_id});`,
                        (e,r)=>{
                            if (e) throw e;
                            else{
                                massage = "ADD qualification is Success";
                                return res.send({error: false, data: results, massage: massage});
                            }
                        })
                    }
                })
            }else{
                db.query(`SELECT * FROM join_qulification WHERE ID_professor = ${userID} AND ID_qualification = ${result[0].ID_qualification} ;`,
                (er,re)=>{
                    if(er)throw er;
                    if(re.length == 0){
                        db.query(`INSERT INTO join_qulification (ID_professor, ID_qualification) VALUES ( ${userID} , ${result[0].ID_qualification});`,
                        (e,r)=>{
                            if (e) throw e;
                            else{
                                let massage = "ADD qualification is Success";
                                return res.send({error: false, data: r, massage: massage});
                            }
                        })
                    }
                    let massage = "ADD qualification is Success";
                    return res.send({error: false, data: re, massage: massage});
                })
                
            }
        })
    }
    static insertskill = async function (req, res, next) {
        const { userID } = req.user;
        
        console.log(userID);
        const { skill } = req.body;
        const form_data = {
            name_coreskill : skill
        }
        let sql = `SELECT * FROM core_skill WHERE name_coreskill ='${skill}'`;
        db.query(sql,(error,result)=>{
            if(error) throw error;
            if(result.length == 0){
                db.query(`INSERT INTO core_skill SET ? ;`,form_data,
                (err, results, fields)=>{
                    if (err) throw err;
                    let massage = "";
                    if (results === undefined || results.length == 0){
                        massage = "ADD skill is faile";
                    }else {
                        
                        const skil_id= results.insertId;
                        db.query(`INSERT INTO skill (ID_professor, ID_coreskill) VALUES ( ${userID} , ${skil_id});`,
                        (e,r)=>{
                            if (e) throw e;
                            else{
                                massage = "ADD skill is Success";
                                return res.send({error: false, data: results, massage: massage});
                            }
                        })
                    }
                })
            }else{
                db.query(`SELECT * FROM skill WHERE ID_professor = ${userID} AND ID_coreskill = ${result[0].ID_coreskill} ;`,
                (er,re)=>{
                    if(er)throw er;
                    if(re.length == 0){
                        db.query(`INSERT INTO skill (ID_professor, ID_coreskill) VALUES ( ${userID} , ${result[0].ID_coreskill});`,
                        (e,r)=>{
                            if (e) throw e;
                            else{
                                let massage = "ADD coreskill is Success";
                                return res.send({error: false, data: r, massage: massage});
                            }
                        })
                    }
                    let massage = "ADD coreskill is Success";
                    return res.send({error: false, data: re, massage: massage});
                })
                
            }
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