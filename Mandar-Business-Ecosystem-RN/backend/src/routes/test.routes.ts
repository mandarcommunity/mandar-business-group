import express from "express";

import { sendEmail }
from "../services/email.service";

import { supabase }
from "../config/supabase";

const router =
  express.Router();

router.get(
  "/test-email",

  async (req, res) => {

    try {

      await sendEmail({
        to: "support@mandarcommunity.in",
        subject: "Mandar Test Email",
        html: `
          <h1>
            Mandar Backend Working 🚀
          </h1>

          <p>
            Resend connected successfully.
          </p>
        `
      });

      res.json({

        success: true,

        message:
          "Email sent successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        error,
      });

    }

  }
);

router.get(
  "/ping-db",

  async (req, res) => {

    try {

      // This simple query keeps the Supabase project active
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .limit(1);

      if (error) throw error;

      res.json({

        success: true,

        message:
          "Database is awake and active!",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        error,
      });

    }

  }
);

export default router;