import { Hono } from 'hono';
import { GoogleGenAI } from '@google/genai';

interface Env {
  GEMINI_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();


app.post('/extract-cgpa', async (c) => {
  try {
    const { image } = await c.req.json();
    
    if (!image) {
      return c.json({ error: 'No image provided' }, 400);
    }

    const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          text: `Analyze this image which should contain a university marksheet, grade card, or transcript. Your task is to extract academic performance data.

WHAT TO LOOK FOR:
- Subject/Course names (e.g. "Mathematics", "Physics", "Computer Science")
- Credits/Units for each subject (numbers like 3, 4, 5)
- Grades/Marks for each subject (can be letters like A/B/C, percentages like 85%, or grade points like 8.5)

CREDIT EXTRACTION:
- Look for columns labeled: "Credits", "Cr", "Units", "L-T-P"
- If "L-T-P" format (e.g. 3-1-2), add them together (3+1+2=6)
- Typical range: 1-10 credits per subject

GRADE CONVERSION (convert everything to 0-10 scale):
- Letter grades: O=10, A+=9, A=8, B+=7, B=6, C=5, U/F=0 (fail)
- Percentage: 90-100→10, 80-89→9, 70-79→8, 60-69→7, 50-59→6, 40-49→5, below 40→0
- Already on 10-point scale: use as-is
- If grade shows as "S", "AA" or similar, treat as 10

IMPORTANT:
- Extract ALL subjects you can clearly see
- If text is small but readable, still extract it
- Look for tables or structured data
- Even if the image quality is not perfect, try to extract what you can read

Return ONLY this JSON format (no other text):
{
  "semesters": [
    {
      "subjects": [
        {"name": "Subject Name", "credits": "3", "gradePoint": "9"}
      ]
    }
  ]
}

Only return an error if the image truly contains NO academic data:
{ "error": "No academic subjects found. Please ensure the image shows a marksheet with subjects, credits, and grades clearly visible." }`
        },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: image
          }
        }
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    if (!response.text) {
      return c.json({ error: 'No response from AI. Please try again.' }, 500);
    }

    const result = JSON.parse(response.text);
    
    if (result.error) {
      return c.json({ error: result.error }, 400);
    }

    if (!result.semesters || result.semesters.length === 0) {
      return c.json({ error: 'Could not find any subjects in the image. Please upload a clear marksheet.' }, 400);
    }

    // Validate and clean the data
    if (!result.semesters || !Array.isArray(result.semesters)) {
      return c.json({ error: 'Invalid data format in image' }, 400);
    }

    // Ensure all values are strings and valid
    const cleanedData = {
      semesters: result.semesters.map((sem: any) => ({
        subjects: (sem.subjects || []).map((sub: any) => {
          const creditsStr = sub.credits !== undefined && sub.credits !== null ? String(sub.credits) : '0';
          const gradePointStr = sub.gradePoint !== undefined && sub.gradePoint !== null ? String(sub.gradePoint) : '0';
          const credits = parseFloat(creditsStr);
          const gradePoint = parseFloat(gradePointStr);
          return {
            name: sub.name ? String(sub.name) : '',
            credits: String(Math.round(credits) || ''),
            gradePoint: String(Math.round(gradePoint) || '')
          };
        })
      }))
    };

    return c.json(cleanedData);
  } catch (error) {
    console.error('Error processing image:', error);
    return c.json({ error: 'Failed to process image' }, 500);
  }
});

export default app;
