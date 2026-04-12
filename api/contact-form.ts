import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AU_PHONE_REGEX =
  /^(?:\+61\s?[2378]\s?\d{4}\s?\d{4}|\+61\s?4\d{2}\s?\d{3}\s?\d{3}|\(0[2378]\)\s?\d{4}\s?\d{4}|0[2378]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$/;

const normalizeAustralianPhoneForDb = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (!digits) return null;

  if (digits.startsWith("61")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+61${digits.slice(1)}`;
  }

  return value;
};

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

    const { name, email, phone, propertyType, message } = req.body ?? {};

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanMessage = String(message).trim();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    if (!AU_PHONE_REGEX.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Australian phone format",
      });
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO contact_messages (
        name,
        email,
        phone,
        message,
        source
      )
      VALUES (
        ${cleanName},
        ${cleanEmail},
        ${normalizeAustralianPhoneForDb(cleanPhone)},
        ${cleanMessage},
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