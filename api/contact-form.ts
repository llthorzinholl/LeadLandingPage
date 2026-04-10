import { neon } from "@neondatabase/serverless";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        error: "Method not allowed",
      });
    }

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return res.status(500).json({
        success: false,
        error: "DATABASE_URL is missing",
      });
    }

    const sql = neon(databaseUrl);

    const { name, email, propertyType, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        received: { name, email, propertyType, message },
      });
    }

    const dbTest = await sql`SELECT 1 AS ok`;

    return res.status(200).json({
      success: true,
      debug: {
        databaseConnection: dbTest,
        received: { name, email, propertyType, message },
      },
    });
  } catch (error: any) {
    console.error("DEBUG /api/contact-form error:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error",
      details: String(error),
    });
  }
}