import cookieParser from 'cookie-parser'
import session from 'cookie-session'

import PassportSetup from './passport-setup.js'

export default class Auth {

    constructor(app) {
        app.use(session({
            name: "koursekat_session",
            secret: "sherlock_holmes",
            maxAge: 60 * 60 * 24 * 1000 * 3
        }))
        app.use(cookieParser())
        this.passport = new PassportSetup(app)
    }

    getRequiredDetails(obj) {
        return obj
    }

    authenticate() {
        return this.passport.passportCustom()
    }

    getUser(req, res) {
        res.json(this.getRequiredDetails(req.user))
    }

    async ensureAuthenticated(req, res, next) {
        console.log(req.user)
        if(!req.user){
            res.status(400).send("User not authenticated" )
            return
        }
        res.status(200).send("Authenticated")
    }

    logout(req, res){
        req.logOut()
        res.send({ message: "Logged out successfully"})
    }
}