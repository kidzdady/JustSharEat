import AuthForm from '../../components/forms/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-yellow-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <AuthForm />
      </div>
    </div>
  );
}