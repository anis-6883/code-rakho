import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import fetchData from './lib/fetch';
import GitHub from 'next-auth/providers/github';

const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // Expire in 30 Days
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                const user = JSON.parse(credentials.userData);
                return user as any;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHub
    ],
    callbacks: {
        async jwt({ token, user, account }) {

            if (account?.provider === 'credentials') {
                if (user) {
                    return {
                        email: token?.email,
                        ...user
                    }
                }
            }

            if (account?.provider === 'google') {

                const res = await fetchData('/web/user/register', {
                    method: 'POST',
                    formData: {
                        email: user?.email,
                        name: user?.name,
                        image: user?.image || "",
                        provider: 'social'
                    }
                });
                if (res?.status === 'SUCCESS') {

                    return {
                        ...res?.data
                    }
                }

            }

            return token

        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    ...token,
                },
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default authConfig;