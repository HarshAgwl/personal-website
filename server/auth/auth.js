class AuthClient {
    constructor() {}

    async auth(credentials) {
        const { password } = credentials
        
        const isPasswordCorrect = password === process.env.ADMIN_PASSWORD

        if (isPasswordCorrect) {
            return { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" }
        } else {
            throw new Error("Admin password wasn't correct")
        }
    }
}

export default AuthClient