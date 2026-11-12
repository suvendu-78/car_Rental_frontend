// import { useState, useEffect } from "react";
// import {
//   UserRound,
//   Save,
//   MapPin,
//   Phone,
//   Mail,
//   CarFront,
//   ShieldCheck,
//   CalendarDays,
//   ChevronDown,
//   CheckCircle2,
// } from "lucide-react";

// const initialForm = {
//   name: "",
//   email: "",
//   phone: "",
//   dateOfBirth: "",
//   gender: "",
//   address: "",
//   city: "",
//   state: "Odisha",
//   pincode: "",
//   emergencyContact: "",
//   emergencyName: "",
//   licenceNumber: "",
//   licenceExpiry: "",
// };

// const Profile = () => {
//   const [form, setForm] = useState(initialForm);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setMessage("");
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");
//     setSaving(true);

//     try {
//       // Connect your profile update API here.
//       // Example:
//       // await axios.put("/api/v1/user/profile", form, {
//       //   withCredentials: true,
//       // });

//       await new Promise((resolve) => setTimeout(resolve, 400));

//       setMessage(
//         "Form validated successfully. Connect your API to save changes.",
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Unable to update your profile. Please try again.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const sections = [
//     {
//       title: "Personal Information",
//       description: "Your basic account details.",
//       icon: UserRound,
//       fields: [
//         {
//           label: "Full Name",
//           name: "name",
//           type: "text",
//           placeholder: "Enter your full name",
//           required: true,
//           autoComplete: "name",
//         },
//         {
//           label: "Email Address",
//           name: "email",
//           type: "email",
//           placeholder: "you@example.com",
//           required: true,
//           autoComplete: "email",
//         },
//         {
//           label: "Phone Number",
//           name: "phone",
//           type: "tel",
//           placeholder: "Enter phone number",
//           autoComplete: "tel",
//         },
//         {
//           label: "Date of Birth",
//           name: "dateOfBirth",
//           type: "date",
//         },
//       ],
//     },
//     {
//       title: "Address Details",
//       description: "Where you live and receive correspondence.",
//       icon: MapPin,
//       fields: [
//         {
//           label: "Street Address",
//           name: "address",
//           type: "text",
//           placeholder: "House number, street, locality",
//           fullWidth: true,
//         },
//         {
//           label: "City",
//           name: "city",
//           type: "text",
//           placeholder: "Enter city",
//         },
//         {
//           label: "State",
//           name: "state",
//           type: "text",
//           placeholder: "Enter state",
//         },
//         {
//           label: "PIN Code",
//           name: "pincode",
//           type: "text",
//           placeholder: "6-digit PIN code",
//           inputMode: "numeric",
//           maxLength: 6,
//         },
//       ],
//     },
//     {
//       title: "Emergency Contact",
//       description: "Someone we can contact if necessary.",
//       icon: Phone,
//       fields: [
//         {
//           label: "Contact Person",
//           name: "emergencyName",
//           type: "text",
//           placeholder: "Enter contact person's name",
//         },
//         {
//           label: "Emergency Phone",
//           name: "emergencyContact",
//           type: "tel",
//           placeholder: "Enter contact number",
//         },
//       ],
//     },
//     {
//       title: "Driving Information",
//       description: "Details relevant to your self-drive bookings.",
//       icon: CarFront,
//       fields: [
//         {
//           label: "Driving Licence Number",
//           name: "licenceNumber",
//           type: "text",
//           placeholder: "Enter licence number",
//         },
//         {
//           label: "Licence Expiry Date",
//           name: "licenceExpiry",
//           type: "date",
//         },
//       ],
//     },
//   ];

//   const inputClass =
//     "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm font-normal text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

//   const labelClass = "mb-2 block text-sm font-normal text-gray-700";
//   const [user, setUser] = useState([]);
//   const data = async () => {
//     const response = await fetch(
//       "http://localhost:8000/api/v1/users/Get_users",
//       {
//         method: "GET",
//         credentials: "include",
//       },
//     );
//     const info = await response.json();

//     setUser([info]);
//     // console.log(info);
//   };

//   useEffect(() => {
//     data();
//   }, []);
//   console.log(user[0].user.name);
//   return (
//     <div className="min-w-0 bg-white text-black">
//       <div className="mx-auto max-w-5xl space-y-6">
//         {/* Page heading */}
//         <header className="border-b border-gray-200 pb-5">
//           <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
//             Account Settings
//           </p>

//           <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
//             My Profile
//           </h1>

//           <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
//             Manage your personal information and keep your details up to date
//             for a smoother booking experience.
//           </p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Profile summary */}
//           <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
//             <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//               <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white">
//                 <UserRound size={30} strokeWidth={1.5} />
//               </div>

//               <div className="min-w-0 flex-1">
//                 <h2 className="text-base font-medium">Account Information</h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Your profile details are used to manage your OdishaDrive
//                   account and bookings.
//                 </p>
//               </div>

//               <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700">
//                 <ShieldCheck size={15} />
//                 Customer Account
//               </span>
//             </div>
//           </section>

//           {/* Profile sections */}
//           {sections.map((section) => {
//             const Icon = section.icon;

//             return (
//               <section
//                 key={section.title}
//                 className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6"
//               >
//                 <div className="mb-6 flex items-start gap-3 border-b border-gray-200 pb-5">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
//                     <Icon size={20} strokeWidth={1.6} />
//                   </div>

//                   <div>
//                     <h2 className="text-base font-medium">{section.title}</h2>

//                     <p className="mt-1 text-sm text-gray-500">
//                       {section.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
//                   {section.fields.map((field) => (
//                     <div
//                       key={field.name}
//                       className={field.fullWidth ? "sm:col-span-2" : ""}
//                     >
//                       <label htmlFor={field.name} className={labelClass}>
//                         {field.label}
//                         {field.required && (
//                           <span className="ml-1 text-gray-500">*</span>
//                         )}
//                       </label>

//                       <input
//                         id={field.name}
//                         name={field.name}
//                         type={field.type}
//                         value={form[field.name]}
//                         onChange={handleChange}
//                         placeholder={field.placeholder || ""}
//                         required={field.required || false}
//                         autoComplete={field.autoComplete}
//                         inputMode={field.inputMode}
//                         maxLength={field.maxLength}
//                         className={inputClass}
//                       />
//                     </div>
//                   ))}

//                   {section.title === "Personal Information" && (
//                     <div>
//                       <label htmlFor="gender" className={labelClass}>
//                         Gender
//                       </label>

//                       <div className="relative">
//                         <select
//                           id="gender"
//                           name="gender"
//                           value={form.gender}
//                           onChange={handleChange}
//                           className={`${inputClass} appearance-none pr-10`}
//                         >
//                           <option value="">Prefer not to say</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>

//                         <ChevronDown
//                           size={16}
//                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </section>
//             );
//           })}

//           {/* Feedback */}
//           {message && (
//             <div
//               role="status"
//               className="flex items-start gap-2 rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-black"
//             >
//               <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
//               <p>{message}</p>
//             </div>
//           )}

//           {error && (
//             <div
//               role="alert"
//               className="rounded-lg border border-gray-300 bg-white p-4 text-sm text-black"
//             >
//               {error}
//             </div>
//           )}

//           {/* Save actions */}
//           <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-xs text-gray-500">
//               Fields marked with * are required.
//             </p>

//             <button
//               type="submit"
//               disabled={saving}
//               className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Save size={17} strokeWidth={1.7} />
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>

//         {/* Privacy note */}
//         <div className="flex items-start gap-3 border-t border-gray-200 pt-5">
//           <ShieldCheck
//             size={19}
//             strokeWidth={1.5}
//             className="mt-0.5 shrink-0 text-gray-600"
//           />

//           <div>
//             <h3 className="text-sm font-medium">
//               Keep your information secure
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-gray-500">
//               Only provide the personal and driving information required for
//               your account and bookings. Make sure your backend validates and
//               securely stores sensitive information.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useState, useEffect } from "react";
import {
  UserRound,
  Save,
  MapPin,
  Phone,
  CarFront,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Pencil,
  X,
  LoaderCircle,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "Odisha",
  pincode: "",
  emergencyContact: "",
  emergencyName: "",
  licenceNumber: "",
  licenceExpiry: "",
};

const sections = [
  {
    title: "Personal Information",
    description: "Your basic account details.",
    icon: UserRound,
    fields: [
      {
        label: "Full Name",
        name: "name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        label: "Email Address",
        name: "email",
        type: "email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Phone Number",
        name: "phone",
        type: "tel",
        placeholder: "Enter phone number",
      },
      {
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
      },
    ],
  },
  {
    title: "Address Details",
    description: "Where you live and receive correspondence.",
    icon: MapPin,
    fields: [
      {
        label: "Street Address",
        name: "address",
        type: "text",
        placeholder: "House number, street, locality",
        fullWidth: true,
      },
      {
        label: "City",
        name: "city",
        type: "text",
        placeholder: "Enter city",
      },
      {
        label: "State",
        name: "state",
        type: "text",
        placeholder: "Enter state",
      },
      {
        label: "PIN Code",
        name: "pincode",
        type: "text",
        placeholder: "6-digit PIN code",
        maxLength: 6,
        inputMode: "numeric",
      },
    ],
  },
  {
    title: "Emergency Contact",
    description: "Someone we can contact if necessary.",
    icon: Phone,
    fields: [
      {
        label: "Contact Person",
        name: "emergencyName",
        type: "text",
        placeholder: "Enter contact person's name",
      },
      {
        label: "Emergency Phone",
        name: "emergencyContact",
        type: "tel",
        placeholder: "Enter contact number",
      },
    ],
  },
  {
    title: "Driving Information",
    description: "Details relevant to your self-drive bookings.",
    icon: CarFront,
    fields: [
      {
        label: "Driving Licence Number",
        name: "licenceNumber",
        type: "text",
        placeholder: "Enter licence number",
      },
      {
        label: "Licence Expiry Date",
        name: "licenceExpiry",
        type: "date",
      },
    ],
  },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#173b2b] focus:ring-1 focus:ring-[#173b2b] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-600";

const labelClass = "mb-2 block text-sm text-gray-700";

const Profile = () => {
  const [form, setForm] = useState(initialForm);
  const [originalForm, setOriginalForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch logged-in user's profile
  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/Get_users",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const info = await response.json();

      if (!response.ok) {
        throw new Error(info.message || "Unable to fetch profile");
      }

      const user = info.user;

      const profileData = {
        ...initialForm,
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        dateOfBirth: user?.dateOfBirth
          ? String(user.dateOfBirth).slice(0, 10)
          : "",
        gender: user?.gender ?? "",
        address: user?.address ?? "",
        city: user?.city ?? "",
        state: user?.state ?? "Odisha",
        pincode: user?.pincode ?? "",
        emergencyContact: user?.emergencyContact ?? "",
        emergencyName: user?.emergencyName ?? "",
        licenceNumber: user?.licenceNumber ?? "",
        licenceExpiry: user?.licenceExpiry
          ? String(user.licenceExpiry).slice(0, 10)
          : "",
      };

      setForm(profileData);
      setOriginalForm(profileData);
    } catch (err) {
      setError(err.message || "Unable to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleEdit = () => {
    setOriginalForm(form);
    setEditing(true);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setForm(originalForm);
    setEditing(false);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      // Requires a matching protected PUT endpoint in your backend.
      const response = await fetch(
        "http://localhost:8000/api/v1/users/profile",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save profile changes");
      }

      setOriginalForm(form);
      setEditing(false);
      setMessage("Profile updated successfully.");

      // Fetch latest saved profile
      await fetchProfile();
    } catch (err) {
      setError(err.message || "Unable to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 bg-white text-sm text-gray-600">
        <LoaderCircle className="animate-spin" size={20} />
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-w-0 bg-white text-black">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
              Account Settings
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Manage your personal information and keep your details up to date
              for a smoother booking experience.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-[#173b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#24523d] sm:self-auto"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </header>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
            {!editing && (
              <button
                type="button"
                onClick={fetchProfile}
                className="ml-3 font-medium underline"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white">
                <UserRound size={30} strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-medium">
                  {form.name || "Your Account"}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {form.email || "Your email address"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {editing
                    ? "Edit your details below."
                    : "Your account information and profile details."}
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-700">
                <ShieldCheck size={15} />
                Customer Account
              </span>
            </div>
          </section>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6"
              >
                <div className="mb-6 flex items-start gap-3 border-b border-gray-200 pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  <div>
                    <h2 className="text-base font-medium">{section.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <div
                      key={field.name}
                      className={field.fullWidth ? "sm:col-span-2" : ""}
                    >
                      <label htmlFor={field.name} className={labelClass}>
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-gray-500">*</span>
                        )}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder || ""}
                        required={field.required || false}
                        disabled={!editing || saving}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        maxLength={field.maxLength}
                        className={inputClass}
                      />
                    </div>
                  ))}

                  {section.title === "Personal Information" && (
                    <div>
                      <label htmlFor="gender" className={labelClass}>
                        Gender
                      </label>

                      <div className="relative">
                        <select
                          id="gender"
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          disabled={!editing || saving}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Prefer not to say</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {editing && (
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Fields marked with * are required.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#173b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#24523d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle className="animate-spin" size={17} />
                  ) : (
                    <Save size={17} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="flex items-start gap-3 border-t border-gray-200 pt-5">
          <ShieldCheck
            size={19}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-gray-600"
          />

          <div>
            <h3 className="text-sm font-medium">
              Keep your information secure
            </h3>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Only provide the personal and driving information required for
              your account and bookings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
