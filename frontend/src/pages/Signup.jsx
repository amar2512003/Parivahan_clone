import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(t("signup.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || t("login.backendUnavailable"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-1 text-navy-900">{t("signup.title")}</h2>
        <p className="mb-6 text-sm text-slate-600">{t("signup.subtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("signup.fullName")}</label>
            <input
              value={form.full_name}
              onChange={update("full_name")}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("signup.mobile")}</label>
            <input
              value={form.mobile}
              onChange={update("mobile")}
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              placeholder="9999999999"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("login.username")}</label>
            <input
              value={form.username}
              onChange={update("username")}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("login.password")}</label>
            <input
              type="password"
              value={form.password}
              onChange={update("password")}
              minLength={6}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("signup.confirmPassword")}</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              minLength={6}
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
            {t("signup.submit")}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          {t("signup.haveAccount")}{" "}
          <Link to="/login" className="text-navy-700 font-medium hover:underline">
            {t("nav.login")}
          </Link>
        </p>
        <Link to="/" className="block text-center text-sm text-navy-700 mt-3 hover:underline">
          {t("login.back")}
        </Link>
      </div>
    </div>
  );
}
