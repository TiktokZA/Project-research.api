import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const { config } = dotenv;
config();

// const accessTokenExpiresIn = 60 * 30 * 1;
const accessTokenExpiresIn = 10; // ss * mm * hh
// const refreshTokenExpiresIn = 60 * 60 * 24 * 7; // ss * mm * hh * dd

const authService ={};
authService.getToken = async ({ userID, username ,Role}) => {
    try {
        const accessPayload = {
			type: 'access',
			userID,
			username,
            Role,
		};
        const accessToken = jwt.sign(accessPayload,process.env.TOKEN_KEY,{
            expiresIn: accessTokenExpiresIn,
        });
        return accessToken;
    } catch (err) {
        throw err;
    }
}

export default authService;