import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

const sql = neon(databaseUrl);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { name, email, propertyType, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    await sql`
      INSERT INTO contact_messages (
        name,
        email,
        property_type,
        message
      )
      VALUES (
        ${name},
        ${email},
        ${propertyType || null},
        ${message}
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