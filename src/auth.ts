import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { ZodError } from "zod"
import axios from "axios"
import { signInSchema } from "@/lib/zod"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("here")
                try {
                    let user = null
                    const { email, password } = await signInSchema.parseAsync(credentials)
                    console.log(email)

                    // logic to salt and hash password

                    // logic to verify if user exists
                    const checkUser = await axios.post("http://localhost:4000/api/user", {
                        // graphql query to check if user exists
                        query: `
                          query {
                            user(email: "${email}", password: "${password}") {
                              id
                              email
                              username
                              password
                            }
                          }
                        `,
                    })

                    if (checkUser.data.errors) {
                        throw new Error("User not found.")
                    }

                    user = checkUser.data.data.user;
                    console.log(user)

                    if (!user) {
                        throw new Error("User not found.")
                    }

                    // return json object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            },
        }),
    ],
})