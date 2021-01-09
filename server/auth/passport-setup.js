import passport from 'passport'
import passportCustom from 'passport-custom'

import AuthClient from './auth.js'

const authClient = new AuthClient()

export default class PassportSetup {
    constructor(app) {
        this.passport = passport
        app.use(this.passport.initialize())
        app.use(this.passport.session())

        this.passport.serializeUser(this.serializeUser)
        this.passport.deserializeUser(this.deserializeUser)
        this.passport.use(new passportCustom(this.passportCustomHandler))
    }

    serializeUser(user, done) {
        done(null, user)
    }

    deserializeUser(user, done) {
        done(null, user)
    }

    async passportCustomHandler(req, done) {
        try {
            console.log(req.body)
            const userDetails = await authClient.auth(req.body)
            console.log("JER")
            return done(null, userDetails)
        } catch (err) {
            return done(null, false)
        }
    }

    passportCustom() {
        return this.passport.authenticate('custom')
    }
}