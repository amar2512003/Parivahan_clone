import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function useDemoCredentials() {
    setUsername("demo");
    setPassword("demo1234");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        t("login.backendUnavailable")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-1 text-navy-900">{t("login.title")}</h2>
        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-sm font-medium text-navy-900">{t("login.demoAccount")}</p>
          <p className="mt-1 text-xs text-slate-600">{t("login.demoHint")}</p>
          <button
            type="button"
            onClick={useDemoCredentials}
            className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline focus-ring"
          >
            {t("login.useDemo")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("login.username")}</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("login.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-900 text-white py-2.5 rounded-md font-medium hover:bg-navy-800 transition focus-ring disabled:opacity-60"
          >
            {t("login.submit")}
          </button>
        </form>

        <Link to="/" className="block text-center text-sm text-navy-700 mt-6 hover:underline">
          {t("login.back")}
        </Link>
      </div>
    </div>
  );
}
