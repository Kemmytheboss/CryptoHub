export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email required" }), {
        status: 400,
      });
    }

    // Simulate sending reset link (mock delay)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(`Mock email sent to ${email}`);

    return new Response(
      JSON.stringify({
        message: `✅ A reset link has been sent to ${email}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
