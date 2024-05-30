import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          name: "email",
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: { name: "password", label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url: string = "http://localhost:3300/sign-in-user";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        let role = "member";

        if (res.ok && user) {
          if (user.data.email === "codelab@test.com") {
            role = "admin";
            return {
              name: user.data.companyName,
              email: user.data.email,
              role,
            };
          } else {
            return {
              name: user.data.companyName,
              email: user.data.email,
              role,
            };
          }
        }
        return null;
      },
    }),

    GithubProvider({
      name: "github",
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET as string,

  callbacks: {
    async redirect() {
      return "/";
    },

    async jwt({ user, token }: any) {
      if (user) token.role = user.role;

      return token;
    },

    async session({ session, token }: any) {
      if (session) session.user.role = token.role;

      return session;
    },
  },

  pages: {
    signIn: "/register",
  },
};
