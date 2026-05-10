import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

// controller for enhancing the resume summary
// POST: /api/ai/enhance-pro-sum
export const enhanceSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'missing required fields' })
        }

        const response = await ai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: `
                        You are an expert AI Resume Builder.

                        Your task is to generate professional Summary, ATS-friendly, concise, and impactful resume content based on the user's input  (only in 1-2 sentence).

                        Guidelines:
                        - Write in professional tone
                        - Use strong action verbs
                        - Keep content concise and achievement-oriented
                        - Avoid unnecessary fluff
                        - Format output cleanly
                        - Tailor content for modern tech jobs
                        - If information is missing, make reasonable improvements without inventing unrealistic details
                        - Return only the requested content without extra explanations
                        `
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// controller for enhancing the job description
// POST: /api/ai/enhance-pro-dsc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'missing required fields' })
        }

        const response = await ai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: `
                        You are an expert resume writer.

                        Improve the given job description for a professional resume (only in 1-2 sentence)

                        - Use action verbs
                        - Keep concise
                        - ATS-friendly
                        - Professional tone
                        - Return only improved content
                        `
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: 'missing required fields' });
        }

        const systemPrompt = `
            You are an AI resume parser.

            Extract structured resume information from the given resume text.

            Return ONLY valid JSON.

            Required JSON format:

            {
                professional_summary: { type: String, default: '' },
                skills: [{ type: String }],
                personal_info: {
                    image: { type: String, default: '' },
                    full_name: { type: String, default: '' },
                    profession: { type: String, default: '' },
                    email: { type: String, default: '' },
                    phone: { type: String, default: '' },
                    location: { type: String, default: '' },
                    linkedin: { type: String, default: '' },
                    website: { type: String, default: '' },
                },
                experience: [
                    {
                        company: { type: String },
                        position: { type: String },
                        start_date: { type: String },
                        end_date: { type: String },
                        description: { type: String },
                        is_current: { type: Boolean },
                    }
                ],
                project: [
                    {
                        name: { type: String },
                        type: { type: String },
                        description: { type: String },
                    }
                ],
                education: [
                    {
                        institution: { type: String },
                        degree: { type: String },
                        field: { type: String },
                        graduation_date: { type: String },
                        gpa: { type: String },
                    }
                ],
            }

            Rules:
            - Return valid JSON only
            - Do not include markdown
            - Do not include explanations
            - Keep missing fields empty
            `;

        const userPrompt = `
            Resume Text:

        provide data in the following format with no additional text before/after
        {
            professional_summary: { type: String, default: '' },
            skills: [{ type: String }],
            personal_info: {
                image: { type: String, default: '' },
                full_name: { type: String, default: '' },
                profession: { type: String, default: '' },
                email: { type: String, default: '' },
                phone: { type: String, default: '' },
                location: { type: String, default: '' },
                linkedin: { type: String, default: '' },
                website: { type: String, default: '' },
            },
            experience: [
                {
                    company: { type: String },
                    position: { type: String },
                    start_date: { type: String },
                    end_date: { type: String },
                    description: { type: String },
                    is_current: { type: Boolean },
                }
            ],
            project: [
                {
                    name: { type: String },
                    type: { type: String },
                    description: { type: String },
                }
            ],
            education: [
                {
                    institution: { type: String },
                    degree: { type: String },
                    field: { type: String },
                    graduation_date: { type: String },
                    gpa: { type: String },
                }
            ],
        }

            ${resumeText}
            `;

        const response = await ai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })

        res.json({ resumeId: newResume._id });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


