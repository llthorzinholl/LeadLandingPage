import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return Response.json(
        {
          success: false,
          error: "DATABASE_URL is missing",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, propertyType, message } = body ?? {};

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
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

    return Response.json(
      {
        success: true,
        message: "Form submitted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /api/contact-form error:", error);

    return Response.json(
      {
        success: false,
        error: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}