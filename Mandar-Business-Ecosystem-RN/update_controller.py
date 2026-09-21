import sys
import re

with open('backend/src/controllers/business.controller.ts', 'r') as f:
    content = f.read()

old_func = '''export const submitVerification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { documentUrl, documentType } = req.body;

    if (!documentUrl || !documentType) {
      return res.status(400).json({ success: false, message: "Document type and URL are required" });
    }

    // Get the business belonging to this user
    const { data: business, error: bizError } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (bizError || !business) {
      return res.status(404).json({ success: false, message: "Business not found for this user" });
    }

    // Update the business record
    const { error: updateError } = await supabase
      .from("businesses")
      .update({
        verification_status: "pending",
        verification_document_url: documentUrl,
        verification_document_type: documentType,
        verification_submitted_at: new Date().toISOString(),
        verification_rejection_reason: null
      })
      .eq("id", business.id);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ success: true, message: "Verification request submitted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};'''

new_func = '''export const submitVerification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { documentUrl, base64Image, documentType } = req.body;

    if (!documentType || (!documentUrl && !base64Image)) {
      return res.status(400).json({ success: false, message: "Document type and image are required" });
    }

    // Get the business belonging to this user
    const { data: business, error: bizError } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (bizError || !business) {
      return res.status(404).json({ success: false, message: "Business not found for this user" });
    }

    let finalDocumentUrl = documentUrl;

    if (base64Image) {
      // Decode base64 and upload to Supabase Storage
      const buffer = Buffer.from(base64Image, 'base64');
      const fileName = \erification_\_\.jpg\;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);
        
      finalDocumentUrl = publicUrlData.publicUrl;
    }

    // Update the business record
    const { error: updateError } = await supabase
      .from("businesses")
      .update({
        verification_status: "pending",
        verification_document_url: finalDocumentUrl,
        verification_document_type: documentType,
        verification_submitted_at: new Date().toISOString(),
        verification_rejection_reason: null
      })
      .eq("id", business.id);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ success: true, message: "Verification request submitted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};'''

# Regex replace because whitespace might not match perfectly
# Let's just use string replace after normalizing whitespace slightly, or regex
pattern = re.compile(r'export const submitVerification = async.*?res\.status\(500\)\.json\(\{ success: false, message: error\.message \}\);\s*\}\s*\};', re.DOTALL)
content = re.sub(pattern, new_func, content)

with open('backend/src/controllers/business.controller.ts', 'w') as f:
    f.write(content)
