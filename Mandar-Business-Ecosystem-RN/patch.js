const fs = require('fs');
const file = 'src/screens/EditProfileScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { supabase } from "../utils/supabase";')) {
  content = content.replace(
    'import {',
    'import { supabase } from "../utils/supabase";\nimport {'
  );
}

const oldSaveBlock = `
  setSaving(true);

  const token =
    await getAccessToken();

  await updateBusiness(

    {

      contactPerson,

      businessName,

      industries:
        selectedIndustries,

      businessTypes:
        selectedBusinessTypes,

      city,

      state,

      address,

      website,

      description,

      email,
      mobile,
      profileImage,
        base64Image: profileImageBase64,
    },

    token as string
  );
`;

const newSaveBlock = `
  setSaving(true);

  const token = await getAccessToken();
  let finalImageUrl = profileImage;

  if (profileImage && profileImage.startsWith('file://')) {
    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const fileName = \`profile_\${Date.now()}.jpg\`;
      
      const { data, error } = await supabase.storage
        .from('business_images')
        .upload(fileName, blob, { contentType: 'image/jpeg' });
        
      if (!error) {
        finalImageUrl = supabase.storage.from('business_images').getPublicUrl(fileName).data.publicUrl;
      }
    } catch (e) {
      console.log("Error uploading profile image:", e);
    }
  }

  await updateBusiness(
    {
      contactPerson,
      businessName,
      industries: selectedIndustries,
      businessTypes: selectedBusinessTypes,
      city,
      state,
      address,
      website,
      description,
      email,
      mobile,
      profileImage: finalImageUrl,
    },
    token as string
  );
`;

content = content.replace(oldSaveBlock, newSaveBlock);
fs.writeFileSync(file, content, 'utf8');
