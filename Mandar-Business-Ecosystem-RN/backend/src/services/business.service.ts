import { generateSlug } from '../utils/slugify';
import { supabase }
from "../config/supabase";

/* CREATE BUSINESS */
export const createBusinessService =
  async (

    userId: string,

    data: any
  ) => {

    const { data: userData } = await supabase
      .from("users")
      .select("full_name, email, mobile")
      .eq("id", userId)
      .single();

    const {
      data: business,
      error,
    } = await supabase
      .from("businesses")
      .insert({
        user_id: userId,
        business_name: data.businessName,
        contact_person: data.contactPerson || userData?.full_name || "",
        industries: data.industries,
        business_types: data.businessTypes,
        city: data.city,
        state: data.state,
        address: data.address,
        website: data.website,
        description: data.description,
        email: data.email || userData?.email || "",
        mobile: data.mobile || userData?.mobile || "",
        verified: false,
        profile_image: data.profileImage || "",
      })

      .select()

      .single();

    if (error) {

      throw new Error(
        error.message
      );
    }

    /* UPDATE USER */
    await supabase

      .from("users")

      .update({

        onboarding_completed:
          true,
      })

      .eq("id", userId);

    return business;
};

/* GET MY BUSINESS */
export const getMyBusinessService =
  async (
    userId: string
  ) => {



    const {
      data,
      error,
    } = await supabase

      .from("businesses")

      .select("*")

      .eq(
        "user_id",
        userId
      )

      .single();

    if (error) {

      throw new Error(
        error.message
      );
    }

    const { data: userData } = await supabase
      .from("users")
      .select("full_name, email, mobile")
      .eq("id", userId)
      .single();

    return {

      id:
        data.id,

      businessName:
        data.business_name,

      contactPerson:
        data.contact_person || userData?.full_name || "",

      industries:
        data.industries,

      businessTypes:
        data.business_types,

      city:
        data.city,

      state:
        data.state,

      address:
        data.address,

      website:
        data.website,

      description:
        data.description,

      email:
        data.email || userData?.email || "",

      mobile:
        data.mobile || userData?.mobile || "",

      verified:
        data.verified,

      profileImage:
        data.profile_image,
    };

};

/* UPDATE BUSINESS */
export const updateBusinessService =
  async (

    userId: string,

    body: any
  ) => {

    let finalProfileImage = body.profileImage;
    if (body.base64Image) {
      try {
        const buffer = Buffer.from(body.base64Image, "base64");
        const fileName = "profile_" + userId + "_" + Date.now() + ".jpg";
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(fileName, buffer, { contentType: "image/jpeg" });
        if (!uploadError) {
          finalProfileImage = supabase.storage.from("profiles").getPublicUrl(fileName).data.publicUrl;
        }
      } catch(e) {}
    }

    const {
      data,
      error,
    } = await supabase

      .from("businesses")

      .update({

        contact_person:
          body.contactPerson,

        business_name:
          body.businessName,

        industries:
          body.industries,

        business_types:
          body.businessTypes,

        city:
          body.city,

        state:
          body.state,

        address:
          body.address,

        website:
          body.website,

        description:
          body.description,

        email:
          body.email,

        mobile:
          body.mobile,

        profile_image: finalProfileImage,
      })

      .eq(
        "user_id",
        userId
      )

      .select()

      .single();

    if (error) {

  throw new Error(
    error.message
  );
}

/* UPDATE USER TABLE */
await supabase

  .from("users")

  .update({

    full_name:
      body.contactPerson,

    mobile:
      body.mobile,

    email:
      body.email,

  })

  .eq(
    "id",
    userId
  );

return data;

};

/* GET BUSINESS BY ID */
export const getBusinessByIdService = async (businessId: string) => {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { data: userData } = await supabase
    .from("users")
    .select("full_name, email, mobile")
    .eq("id", data.user_id)
    .single();

  return {
    ...data,
    user: userData
  };
};