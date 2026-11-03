import Link from "next/link";

export const metadata = { title: "Privacy policy" };

// Draft wording. Have it reviewed before submitting to the app stores.
export default function PrivacyPage() {
  return (
    <article dir="ltr" className="mx-auto w-full max-w-2xl space-y-4 px-4 py-10 text-sm leading-relaxed">
      <Link href="/" className="text-primary underline-offset-4 hover:underline">
        NephChat
      </Link>
      <h1 className="text-2xl font-semibold">Privacy policy</h1>
      <p>
        NephChat helps you understand kidney health. To save your results between visits we store your account
        details (name, email, a hashed password) and the answers and results you choose to save: risk check answers,
        eGFR calculations and diet plan selections.
      </p>
      <h2 className="text-lg font-semibold">Who can see your data</h2>
      <p>
        Your saved results are visible only to you. NephChat staff accounts can see aggregate, anonymous usage
        counts (for example, how many risk checks were completed) and your name and email for account management,
        but not your individual health results.
      </p>
      <h2 className="text-lg font-semibold">How it is protected</h2>
      <p>All traffic is encrypted with HTTPS and data is stored in an access-controlled database with regular backups.</p>
      <h2 className="text-lg font-semibold">Deleting your data</h2>
      <p>
        You can delete your account at any time from the Account page. This permanently removes your account and all
        saved results.
      </p>
      <h2 className="text-lg font-semibold">Not medical advice</h2>
      <p>NephChat provides general education and screening tools. It does not diagnose or replace a doctor.</p>
    </article>
  );
}
