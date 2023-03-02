import db from "../db/DBcon.js";

class researchController {
    static getallresearch = async (req, res, next)=>{
        let strsql = `SELECT * FROM research ;`
        db.query(strsql , (error , result) =>{
            if(error) throw error;
            return res.status(200).send({
                data : result
            })
        });
    }
    static searchkeyword =async (req,res,next)=>{
        const { keyword } =req.body;
        let strsql = `SELECT * FROM research 
            INNER JOIN professor ON research.ID_professor = professor.ID_professor
            WHERE research.name_research LIKE '%${keyword}%' 
                OR professor.Keyword LIKE '%${keyword}%'
                OR professor.firstname_professor LIKE '%${keyword}%'
                OR professor.lastname_professor LIKE '%${keyword}%'
            ;`
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
            WHERE name_research LIKE '%${keyword}%' 
            ;`
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
        let strsql = `SELECT * FROM professor 
            WHERE professor.Keyword LIKE '%${keyword}%'
            OR professor.firstname_professor LIKE '%${keyword}%'
            OR professor.lastname_professor LIKE '%${keyword}%'
            ;`
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