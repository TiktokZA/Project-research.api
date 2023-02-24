import db from "../db/DBcon.js";
import bcrypt from 'bcryptjs';

class UserController {
    static updatedata = async function (req, res, next) {
        const { userID} = req.user;
        const { username= null, firstname= null, lastname=null, email=null, Phone_number=null, password = null} = req.body;
        const r = await db.query(`
        UPDATE users SET 
            ${username ? `username = '${username}', `: `` }
            ${firstname ? `first_name = '${firstname}', `:`` }
            ${lastname ? `last_name = '${lastname}', `: `` }
            ${email ? `Email = '${email}' ,`: `` } 
            ${password ? `password = '${bcrypt.hashSync(password, 10)}', `: `` }
            ${Phone_number ? ` phonenumber = '${Phone_number}', ` : `` }
            update_date = now()
        WHERE ID_user = ${userID } ;`,
       async (error, results, fields) => {
            // if (error) throw error;
            let massage = "";
            if (results === undefined || results.length == 0){
                massage = "UPDATE User is faile";
            }else {
                massage = "UPDATE User is Success";
            }
            return await res.send(massage);
            // return res.send({error: false, data: results, massage: massage});
        });
        // console.log(r.sql)
    }

}

export default UserController;