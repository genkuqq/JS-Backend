import { jwtVerify } from "jose";

const getJwtSecretKey = ()=> {
    const secretKey = process.env.SECRET_KEY;
    if(!secretKey){
        throw new Error("Env Key yok")
    }
    return new TextEncoder().encode(secretKey);
}

//test summary
/**
 * Verify process for jwt token.
 * @param {jwtToken} jwtToken token for verifiy process.
 * @return {payload} The result of verified token's payload.
 */

export async function verifyJwtToken(token){
    try{
        const {payload} = await jwtVerify(token,getJwtSecretKey())
        return payload;
    }catch(err){
        return null;
    }
}