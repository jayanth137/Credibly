import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "84516804003-hnfh5cm3js52oi1m7sadeis708ncqajv.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: 'openid profile email https://www.googleapis.com/auth/youtube.readonly'
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // console.log('JWT callback:', { token, account });
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // console.log('Session callback:', { session, token });

            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    // session: {
    //     strategy: "jwt",
    //     maxAge: 30 * 24 * 60 * 60,
    // },
}