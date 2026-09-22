const fs = require('fs');
const file = 'backend/src/services/business.service.ts';
let content = fs.readFileSync(file, 'utf8');

const oldBlock = `      const {
        data,
        error,
      } = await supabase
  
        .from("businesses")`;

const newBlock = `
      let finalProfileImage = body.profileImage;
      
      if (body.base64Image) {
        try {
          const buffer = Buffer.from(body.base64Image, 'base64');
          const fileName = \`profile_\${userId}_\${Date.now()}.jpg\`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('business_images')
            .upload(fileName, buffer, { contentType: 'image/jpeg' });
            
          if (!uploadError) {
            finalProfileImage = supabase.storage.from('business_images').getPublicUrl(fileName).data.publicUrl;
          } else {
            console.error("Supabase Upload Error:", uploadError);
          }
        } catch(e) {
          console.error("Base64 upload failed:", e);
        }
      }

      const {
        data,
        error,
      } = await supabase
  
        .from("businesses")`;

content = content.replace(oldBlock, newBlock);

content = content.replace(
  'profile_image: body.profileImage,',
  'profile_image: finalProfileImage,'
);

fs.writeFileSync(file, content, 'utf8');
