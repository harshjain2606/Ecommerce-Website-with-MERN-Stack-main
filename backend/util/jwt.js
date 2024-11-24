const sendToken=(user,statusCode,res)=>{
    //Creating JWT Token
    const token = user.getJwToken();

    const options = {
        expires : new Date(
            Date.now()+ process.env.COOKIES_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true 
    }

    res.status(statusCode).cookie('token',token,options).json({
        succes: true,
        user,
        token
    })
}
module.exports=sendToken