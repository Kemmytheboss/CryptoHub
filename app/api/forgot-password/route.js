export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required." }),
        { status: 400 }
      );
    }

    console.log(`Mock password reset email sent to: ${email}`);

    return new Response(
      JSON.stringify({
        message: "Reset link sent successfully (mock).",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error." }),
      { status: 500 }
    );
  }
}
