import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FormData from 'form-data'
const axios = require('axios')

const loginUrl = "https://splatbackend-production.up.railway.app/users/login"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const formData = new FormData();
        formData.append("email", credentials.username);
        formData.append("password", credentials.password);

        let errorMsg = "";

        const res = await axios.post(loginUrl,{
          "email": credentials.username,
          "password": credentials.password
        }).catch(err => errorMsg = err)

        const resData = await res.data;

        if (errorMsg.length === 0) {
          return {
            credentials: resData,
            userInfo: resData
          }
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.access_token = user.credentials.token;
        token.refresh_token = user.credentials.refresh_token;
        token.email = user.userInfo.email;
        token.userId = user.userInfo.user_id;
        token.first_name = user.userInfo.first_name;
        token.last_name = user.userInfo.last_name;
        token.timetable = user.userInfo.timetable;
        token.points = user.userInfo.points;
      }
      return token
    },
    session({ session, token }) {
      session.accessToken = token.access_token;
      session.refreshToken = token.refresh_token;
      session.user.name = token.first_name + " " + token.last_name;
      session.user.timetable = token.timetable;
      session.user.points = token.points;
      session.user.userId = token.userId;
      return session;
    }
  },
  async redirect({ url, baseUrl }) {
    return url;
  },
  pages: {
    signIn: '/signin',
  },
  secret: "iamnosecret"
})