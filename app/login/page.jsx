'use client';
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 p-6">
      <AuthForm type="login" />
    </div>
  );
}
