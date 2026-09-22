const fs = require('fs');
const file = 'backend/src/services/business.service.ts';
let content = fs.readFileSync(file, 'utf8');

const regex = /const \{\s*data,\s*error,\s*\}\s*=\s*await supabase\s*\.from\("businesses"\)/;

const newBlock = `      let finalProfileImage = body.profileImage;
      if (body.base64Image) {
        try {
          const buffer = Buffer.from(body.base64Image, 'base64');
          const fileName = "profile_" + userId + "_" + Date.now() + ".jpg";
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('business_images')
            .upload(fileName, buffer, { contentType: 'image/jpeg' });
          if (!uploadError) {
            finalProfileImage = supabase.storage.from('business_images').getPublicUrl(fileName).data.publicUrl;
          }
        } catch(e) {}
      }

      const { data, error, } = await supabase.from("businesses")`;

content = content.replace(regex, newBlock);
fs.writeFileSync(file, content, 'utf8');
