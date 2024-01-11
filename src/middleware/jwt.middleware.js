import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    //1. Read the token
    const authHeader = req.headers['authorization'];
    // const token = req.cookies.userToken;
    // console.log(token, 'cookies of jwt');
    //2. if no token. return the error.

    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    //3. check if token is valid.
    try {
        const token = authHeader.split(" ")[1];
        // console.log(token);
        const payload = jwt.verify(token,
            "49Qj1STJUNSCtzOHT9mzEx2MqZ6yfMeP"

        )
        req.userID = payload.userID;
        req.email = payload.email;
        req.userName=payload.userName
        console.log(payload);
        // res.status(200).send(payload);
    } catch (err) {
        //5.return error.
        return res.status(401).send('Unauthorized');
    }
    //4. call next middleware.
    next();
}
export default jwtAuth;