import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f1ec] px-6 text-[#2d1b16]">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-2xl backdrop-blur md:p-14">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8b5e45] text-white">
          <CheckCircle size={34} />
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#8b5e45]">
          Elena's Bakehouse
        </p>

        <h1 className="mb-5 text-4xl font-semibold tracking-tight md:text-6xl">
          Thank You
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#6b4a3c]">
          Your inquiry has been received. A member of Elena's Bakehouse will
          review your request and contact you shortly to begin creating a
          personalized experience.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-full bg-[#2d1b16] px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-[#8b5e45]"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
}
