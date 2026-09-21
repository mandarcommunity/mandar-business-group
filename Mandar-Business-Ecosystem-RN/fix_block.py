import sys
import re

with open('backend/src/controllers/admin.controller.ts', 'r') as f:
    content = f.read()

content = re.sub(
    r'export const blockUser = async \(req: Request, res: Response\) => \{[\s\S]*?res\.status\(500\)\.json\(\{ success: false, message: error\.message \}\);\s*\}\s*\};',
    '''export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("users").update({ is_blocked: true, status: 'blocked' }).eq("id", id);
    if (error) throw error;
    res.status(200).json({ success: true, message: 'User blocked successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};''',
    content
)

with open('backend/src/controllers/admin.controller.ts', 'w') as f:
    f.write(content)
