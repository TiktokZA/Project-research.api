import db from "../db/DBcon.js";

class researchController {
    static getallresearch = async (req, res, next)=>{
        let strsql = `SELECT * FROM research 
        INNER JOIN professor ON research.ID_professor = professor.ID_professor
        INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
        WHERE research.status != "invalid"
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            return res.status(200).send({
                data : result
            })
        });
    }
    static getallresearchorderyear = async (req, res, next)=>{
        let strsql = `SELECT * FROM research 
        INNER JOIN professor ON research.ID_professor = professor.ID_professor
        INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
        WHERE research.status != "invalid"
        ORDER BY research.Publication_date 
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            return res.status(200).send({
                data : result
            })
        });
    }
    static deleteresearchbyidpro = async function (req, res, next) {
        const { userID } = req.user;
        
        console.log(userID);
        const { researchid} = req.body;
        db.query(`UPDATE research SET status = "invalid" ,Date_Update = now() WHERE ID_research = ${researchid} AND ID_professor = ${userID}`, (error, results, fields)=>{
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
    static insertresearchbyidpro = async function (req, res, next) {
        const { userID } = req.user;
        let date_update = new Date(Date.now());
        let id_research;
        console.log(userID);
        const { name_re , authors , Pu_date ,conference, Publisher, ID_Type, Description ,link } = req.body;
        let date_public = new Date(Pu_date);
        const form_data ={
            name_research:name_re,
            Publication_date : date_public ,
            conference:conference,
            Description:Description,
            Link:link,
            ID_professor:userID,
            Publisher: Publisher,
            ID_Type:parseInt(ID_Type), 
            Citation: 0,
            authors:authors,
            Date_Update:date_update,
            status : "valid"
        }
        console.log("form_data =>",form_data)
        await db.query(`SELECT * FROM research WHERE name_research = '${name_re}' AND ID_Type = ${parseInt(ID_Type)};`,
        async (err, r) =>{
            if (err) throw err;
            if(r.length == 0 ){
                await db.query(`INSERT INTO research SET ? ;`,
                form_data,
                (err, result)=>{
                    if (err) {
                        throw error;
                    }else{
                        
                        console.log(`Insert data Research Success!!`);

                        return res.status(200).send({data : result , msg :'Insert data Research Success!!'})
                    }
                });
            }else{
                id_research =r[0].ID_research;
                await db.query(`UPDATE research SET ? WHERE ID_research = ${id_research } `,
                form_data,
                (err, result)=>{
                        if (err) {
                            throw error;
                        }else{
                            
                            console.log(`Update data Research Success!!`);
                            return res.status(200).send({data : result , msg :'Insert data Research Success!!'})
                        }
                });
            }
        });
        
    }
    static getallskill = async (req, res, next)=>{
        let strsql = `SELECT * FROM professor
        INNER JOIN skill ON skill.ID_professor = professor.ID_professor
        INNER JOIN core_skill ON core_skill.ID_coreskill = skill.ID_coreskill
        ORDER BY core_skill.ID_coreskill 
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            return res.status(200).send({
                data : result
            })
        });
    }
    static getresearch = async (req, res, next)=>{
        const {id} =req.body;
        let strsql = `SELECT * FROM research 
        INNER JOIN professor ON research.ID_professor = professor.ID_professor
        INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
        WHERE research.ID_research = ${id} AND research.status != "invalid"
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });
    }
    static getresearchbypro = async (req, res, next)=>{
        const {id} =req.body;
        let strsql = `SELECT *FROM research 
        INNER JOIN professor ON research.ID_professor = professor.ID_professor
        INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
        WHERE research.ID_professor = ${id} AND research.status != "invalid"
        ORDER BY research.Publication_date
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });
    }
    static getresearchbyidpro = async (req, res, next)=>{
        const {id} =req.body;
        let strsql = `SELECT 
            research.ID_research, research.name_research, research.Publication_date, research.conference AS ConferenceOrJornal ,research.Description,
            research.Link, research.Publisher,research.Citation, research.authors, professor.title_name, professor.firstname_professor, professor.lastname_professor,
            professor.Email, professor.Keyword, type_research.name_Type
         FROM research 
        INNER JOIN professor ON research.ID_professor = professor.ID_professor
        INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
        WHERE research.ID_professor = ${id} AND research.status != "invalid"
        ORDER BY research.Publication_date
        ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });
    }
    static searchkeyword =async (req,res,next)=>{
        const { keyword } =req.body;
        // console.log("dwadw",keyword)
        let strsql = `SELECT * FROM research 
            INNER JOIN professor ON research.ID_professor = professor.ID_professor
            INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
            WHERE (research.name_research LIKE '${keyword}%' AND research.status != "invalid")
                OR (professor.Keyword LIKE '%${keyword}%' AND research.status != "invalid")
                OR (professor.firstname_professor LIKE '%${keyword}%' AND research.status != "invalid")
                OR (professor.lastname_professor LIKE '%${keyword}%' AND research.status != "invalid")
            ORDER BY Publication_date DESC;`;
        db.query(strsql , (error, result)=>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });
    }
    static searchkeywordresearch =async (req,res,next)=>{
        const { keyword } =req.body;
        let strsql = `SELECT * FROM research 
            INNER JOIN professor ON research.ID_professor = professor.ID_professor
            INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
            WHERE name_research LIKE '%${keyword}%' AND research.status != "invalid"
            ORDER BY research.name_research;`;
        db.query(strsql , (error, result)=>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });

    }
    static searchkeywordprofessor =async (req,res,next)=>{
        const { keyword } =req.body;
        let strsql = `SELECT * FROM research 
            INNER JOIN professor ON research.ID_professor = professor.ID_professor
            INNER JOIN type_research ON research.ID_Type = type_research.ID_Type
            WHERE (professor.Keyword LIKE '%${keyword}%' AND research.status != "invalid")
            OR (professor.firstname_professor LIKE '%${keyword}%' AND research.status != "invalid")
            OR (professor.lastname_professor LIKE '%${keyword}%' AND research.status != "invalid")
            ORDER BY research.name_research;`;
        db.query(strsql , (error, result)=>{
            if(error) throw error;
            if(result.length == 0){
                return res.status(404).send({
                    message : "Searching not found",
                    data :null
                })
            }else{
                return res.status(200).send({
                    message : "Searching is found",
                    data : result
                })
            }
        });

    }
}

export default researchController;