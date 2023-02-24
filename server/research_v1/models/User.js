import db from "../db/DBcon.js";


class authModel{
    static findOne = async function ({ email }){
        if( !email) return [];
        const queryStr = `
        SELECT * FROM professor WHERE Email = "${email}"
        `;
        const queryRes = await db.query(queryStr, (err, res, fields)=>{
            if(err) return [];
            else{
                return res;
            }
        });

        return queryRes;
        
    }
}

export default authModel;