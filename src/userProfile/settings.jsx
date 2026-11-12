import { useState, useEffect } from "react";
import {
  Bell,
  ShieldCheck,
  Settings as SettingsIcon,
  Mail,
  CalendarDays,
  Tag,
  LockKeyhole,
  Eye,
  EyeOff,
  Monitor,
  Save,
  Check,
} from "lucide-react";

const Settings = () => {
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [offers, setOffers] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [appearance, setAppearance] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState([]);
  // Store all password inputs in one object
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [preferencesSaving, setPreferencesSaving] = useState(false);

  const preferences = [
    {
      title: "Booking Updates",
      description: "Receive reservation confirmations and trip updates.",
      value: bookingUpdates,
      change: setBookingUpdates,
      icon: CalendarDays,
    },
    {
      title: "Special Offers",
      description: "Receive occasional promotions and rental discounts.",
      value: offers,
      change: setOffers,
      icon: Tag,
    },
    {
      title: "Email Notifications",
      description: "Receive account-related notifications by email.",
      value: emailUpdates,
      change: setEmailUpdates,
      icon: Mail,
    },
  ];

  // Update password object
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Save preferences
  const handleSave = async () => {
    setMessage("");
    setError("");
    setPreferencesSaving(true);

    try {
      const settings = {
        bookingUpdates,
        offers,
        emailUpdates,
        appearance,
      };

      // Preferences API is not implemented yet.
      // Replace this section when the backend endpoint is ready.
      console.log("Preferences to save:", settings);

      setMessage("Preferences are selected but are not saved permanently yet.");
    } catch {
      setError("Unable to save your preferences. Please try again.");
    } finally {
      setPreferencesSaving(false);
    }
  };
  const data = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/users/Get_users",
      {
        method: "GET",
        credentials: "include",
      },
    );
    const info1 = await response.json();
    console.log(info1);
    setInfo(info1);
  };
  useEffect(() => {
    data();
  }, {});
  // Change password using backend API
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "Your new password must be different from your current password.",
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword,
            newPassword,
            email: info.user.email,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to change your password.");
      }

      setMessage(data.message || "Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change your password. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

  return (
    <div className="min-w-0 space-y-6 bg-white text-black">
      {/* Page heading */}
      <header className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
          Account preferences
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your notifications, security and account preferences.
        </p>
      </header>

      {/* Notifications */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3 border-b border-gray-200 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
            <Bell size={20} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-base font-medium">Notifications</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose which updates you want to receive.
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {preferences.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <Icon
                    size={19}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-gray-600"
                  />

                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={item.value}
                  aria-label={item.title}
                  onClick={() => item.change(!item.value)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                    item.value
                      ? "border-black bg-black"
                      : "border-gray-300 bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-transform ${
                      item.value ? "translate-x-[21px]" : "translate-x-[3px]"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
            <Monitor size={20} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-base font-medium">Appearance</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose your preferred dashboard appearance.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              value: "light",
              title: "Light",
              description: "White background and dark text",
            },
            {
              value: "system",
              title: "System default",
              description: "Use your device preference",
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAppearance(option.value)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
                appearance === option.value
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400">
                {appearance === option.value && (
                  <span className="h-2.5 w-2.5 rounded-full bg-black" />
                )}
              </span>

              <span>
                <span className="block text-sm font-medium">
                  {option.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">
                  {option.description}
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Appearance selection is a preference only; theme switching needs to be
          connected separately.
        </p>
      </section>

      {/* Account security */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3 border-b border-gray-200 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
            <ShieldCheck size={20} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-base font-medium">Account Security</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4">
          {/* Current password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm text-gray-700"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className={inputClass}
              required
              disabled={saving}
            />
          </div>

          {/* New password */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm text-gray-700"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Minimum 8 characters"
                minLength={8}
                className={`${inputClass} pr-11`}
                required
                disabled={saving}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm new password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm text-gray-700"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-enter new password"
              minLength={8}
              className={inputClass}
              required
              disabled={saving}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole size={16} />
            {saving ? "Processing..." : "Change Password"}
          </button>
        </form>
      </section>

      {/* Success and error feedback */}
      {(message || error) && (
        <div
          role={error ? "alert" : "status"}
          className={`flex items-start gap-2 rounded-lg border p-4 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-800"
          }`}
        >
          {message && <Check size={17} className="mt-0.5 shrink-0" />}
          <p>{error || message}</p>
        </div>
      )}

      {/* Save preferences */}
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-gray-500">
          Save your notification preferences when you're ready.
        </p>

        <button
          type="button"
          onClick={handleSave}
          disabled={preferencesSaving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {preferencesSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      {/* Footer note */}
      <div className="flex items-start gap-3 border-t border-gray-200 pt-5">
        <SettingsIcon
          size={18}
          strokeWidth={1.5}
          className="mt-0.5 shrink-0 text-gray-500"
        />

        <p className="text-xs leading-5 text-gray-500">
          Notification preferences are currently held in page state. Connect a
          backend API to save them permanently.
        </p>
      </div>
    </div>
  );
};

export default Settings;
