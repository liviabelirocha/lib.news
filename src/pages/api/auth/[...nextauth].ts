import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user user:email",
    }),
  ],
  callbacks: {
    async session(session) {
      let userActiveSubscription;

      try {
        userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection(
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active")
            )
          )
        );
      } catch {
        userActiveSubscription = null;
      }

      return {
        ...session,
        activeSubscription: userActiveSubscription,
      };
    },
    async signIn(user, account, profile) {
      try {
        if (!user.email) {
          // https://developer.github.com/v3/users/emails/#list-email-addresses-for-the-authenticated-user
          const { data } = await axios.get(
            "https://api.github.com/user/emails",
            {
              headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                Authorization: `token ${account.accessToken}`,
              },
            }
          );
          if (!data || data.length === 0) {
            return;
          }
          // Sort by primary email - the user may have several emails, but only one of them will be primary
          const sortedEmails = data.sort((a, b) => b.primary - a.primary);

          profile.email = sortedEmails[0].email;
          user.email = sortedEmails[0].email;
        }

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email: user.email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch (err) {
        console.error(axios.isAxiosError(err) ? err.response.data : err);
        return false;
      }
    },
  },
});
