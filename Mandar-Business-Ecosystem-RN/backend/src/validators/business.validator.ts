import { z }
from "zod";

export const createBusinessValidator =
  z.object({

    businessName:
      z.string()
        .min(2),

    industries:
      z.array(
        z.string()
      )
      .min(1),

    businessTypes:
      z.array(
        z.string()
      )
      .min(1),

    city:
      z.string()
        .min(2),

    state:
      z.string()
        .min(2),

    address:
      z.string()
        .optional(),

    website:
      z.string()
        .optional(),

    description:
      z.string()
        .optional(),
  });