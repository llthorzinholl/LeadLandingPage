import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return res.status(500).json({
        success: false,
        error: "DATABASE_URL is missing",
      });
    }

    const { name, email, propertyType, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO contact_messages (
        name,
        email,
        message,
        source
      )
      VALUES (
        ${name},
        ${email},
        ${message},
        ${propertyType || "website_form"}
      )
    `;

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error: any) {
    console.error("API /api/contact-form error:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error",
    });
  }
}