const fs = require('fs');
const file = 'backend/src/services/business.service.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 1. Restore getMyBusinessService by removing the injected block
let getIdx = lines.findIndex(l => l.includes('export const getMyBusinessService ='));
let badBlockStart = -1;
let badBlockEnd = -1;

for (let i = getIdx; i < lines.length; i++) {
  if (lines[i].includes('let finalProfileImage = body.profileImage;')) {
    badBlockStart = i;
  }
  if (lines[i].includes('const { data, error, } = await supabase.from("businesses")')) {
    badBlockEnd = i;
    break;
  }
}

if (badBlockStart !== -1 && badBlockEnd !== -1) {
  let restoredQuery = [
    '    const {',
    '      data,',
    '      error,',
    '    } = await supabase',
    '',
    '      .from("businesses")',
  ];
  lines.splice(badBlockStart, badBlockEnd - badBlockStart + 1, ...restoredQuery);
}

// 2. Inject into updateBusinessService
let updateIdx = lines.findIndex(l => l.includes('export const updateBusinessService ='));
let supabaseQueryIdx = -1;

for (let i = updateIdx; i < lines.length; i++) {
  if (lines[i].includes('    const {') && lines[i+1].includes('      data,') && lines[i+5].includes('      .from("businesses")')) {
    supabaseQueryIdx = i;
    break;
  }
}

if (supabaseQueryIdx !== -1) {
  let injectedLogic = [
    '    let finalProfileImage = body.profileImage;',
    '    if (body.base64Image) {',
    '      try {',
    '        const buffer = Buffer.from(body.base64Image, "base64");',
    '        const fileName = "profile_" + userId + "_" + Date.now() + ".jpg";',
    '        const { data: uploadData, error: uploadError } = await supabase.storage',
    '          .from("business_images")',
    '          .upload(fileName, buffer, { contentType: "image/jpeg" });',
    '        if (!uploadError) {',
    '          finalProfileImage = supabase.storage.from("business_images").getPublicUrl(fileName).data.publicUrl;',
    '        }',
    '      } catch(e) {}',
    '    }',
    ''
  ];
  lines.splice(supabaseQueryIdx, 0, ...injectedLogic);
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
