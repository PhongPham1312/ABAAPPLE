import userService from '../services/user';

let Login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.Login(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

// Create a new user
let createuser = async (req, res) => {
    let message = await userService.create(req.body);
    return res.status(200).json({
        errCode: 0,
        message: message
    })
}



module.exports = {
    Login: Login,
    createuser: createuser,
}