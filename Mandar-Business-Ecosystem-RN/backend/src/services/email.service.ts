// @ts-nocheck
import { Resend }
from "resend";

import dotenv
from "dotenv";

dotenv.config();

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

interface SendEmailOptions {

  to: string;

  subject: string;

  html: string;
}

export const sendEmail =
  async ({

    to,

    subject,

    html,

  }: SendEmailOptions) => {

    try {

      const data =
        await resend.emails.send({

          from:
            "Mandar Community <noreply@mandarcommunity.in>",

          to,

          subject,

          html,
        });

      return data;

    } catch (error) {

      console.log(
        "EMAIL ERROR:",
        error
      );

      throw error;
    }

};