export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ message: "Missing token or password." }),
        { status: 400 }
      );
    }

    // Simulate token validation & saving new password
    console.log(`✅ Password updated for token: ${token}`);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return new Response(
      JSON.stringify({ message: "Password successfully reset!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Server error resetting password." }),
      { status: 500 }
    );
  }
}
