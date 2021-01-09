class AuthClient {
    constructor() {}

    async auth(credentials) {
        console.log("HERE")
        const { password } = credentials
        
        console.log("LAL")
        console.log(process.env.ADMIN_PASSWORD.length)
        console.log("LOLE2s")

        const isPasswordCorrect = password === process.env.ADMIN_PASSWORD

        if (isPasswordCorrect) {
            return { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" }
        } else {
            throw new Error("Admin password wasn't correct")
        }
    }
}

export default AuthClient