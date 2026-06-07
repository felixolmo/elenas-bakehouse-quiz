"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import {
  baseQuestions,
  finalQuestions,
  getBranchQuestions,
  Question,
} from "@/lib/questions";

type Answers = Record<string, string | string[] | ContactInfo>;

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initialContact: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    contact: initialContact,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService =
    typeof answers.service === "string" ? answers.service : undefined;

  const questions = useMemo<Question[]>(() => {
    return [
      ...baseQuestions,
      ...getBranchQuestions(selectedService),
      ...finalQuestions,
    ];
  }, [selectedService]);

  const currentQuestion = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);

  function updateAnswer(questionId: string, value: string) {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };

      if (questionId === "service") {
        setStep(1);
      }

      return next;
    });
  }

  function toggleMultiAnswer(questionId: string, option: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId])
        ? (prev[questionId] as string[])
        : [];

      const exists = current.includes(option);
      const nextValue = exists
        ? current.filter((item) => item !== option)
        : [...current, option];

      return {
        ...prev,
        [questionId]: nextValue,
      };
    });
  }

  function updateContact(field: keyof Omit<ContactInfo, "consent">, value: string) {
    setAnswers((prev) => {
      const contact =
        typeof prev.contact === "object" && !Array.isArray(prev.contact)
          ? (prev.contact as ContactInfo)
          : initialContact;

      return {
        ...prev,
        contact: {
          ...contact,
          [field]: value,
        },
      };
    });
  }

  function updateConsent(value: boolean) {
    setAnswers((prev) => {
      const contact =
        typeof prev.contact === "object" && !Array.isArray(prev.contact)
          ? (prev.contact as ContactInfo)
          : initialContact;

      return {
        ...prev,
        contact: {
          ...contact,
          consent: value,
        },
      };
    });
  }

  function canContinue(question: Question) {
    const value = answers[question.id];

    if (question.type === "multi") {
      return Array.isArray(value) && value.length > 0;
    }

    if (question.type === "contact") {
      const contact = answers.contact as ContactInfo;
      return (
        contact.firstName.trim() &&
        contact.lastName.trim() &&
        contact.email.trim() &&
        contact.phone.trim() &&
        contact.consent
      );
    }

    if (question.type === "text" || question.type === "textarea") {
      return typeof value === "string" && value.trim().length > 0;
    }

    return typeof value === "string" && value.trim().length > 0;
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: "Elena's Bakehouse",
          submittedAt: new Date().toISOString(),
          answers,
        }),
      });

      window.location.href = "/thank-you";
    } catch {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  function nextStep() {
    if (step === questions.length - 1) {
      handleSubmit();
      return;
    }

    setStep((current) => Math.min(current + 1, questions.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[#f8f1ec] text-[#2d1b16]">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(189,137,97,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(98,55,39,0.18),_transparent_35%)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-2xl backdrop-blur md:p-14"
          >
            <div className="mb-8 flex justify-center">
              <Image
                src="/logo/elenas-bakehouse-logo.png"
                alt="Elena's Bakehouse"
                width={320}
                height={160}
                priority
                className="h-auto w-[220px] md:w-[320px]"
              />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#8b5e45]">
              Elena's Bakehouse
            </p>

            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-[#2d1b16] md:text-6xl">
              Let's Create Something Extraordinary
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#6b4a3c]">
              From elegant wedding cakes and handcrafted pastries to artisan
              breads, corporate gifting, and private events, Elena's Bakehouse
              creates refined dessert experiences delivered throughout Viera,
              Melbourne, and Miami.
            </p>

            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#2d1b16] px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#8b5e45]"
            >
              Begin Your Consultation
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f1ec] px-5 py-8 text-[#2d1b16] md:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur md:p-10">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm font-medium text-[#8b5e45]">
              <span>
                Step {step + 1} of {questions.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#eadbd2]">
              <motion.div
                className="h-full rounded-full bg-[#8b5e45]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id + step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e45]">
                Luxury Pastry Inquiry
              </p>

              <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-5xl">
                {currentQuestion.title}
              </h2>

              {currentQuestion.subtitle && (
                <p className="mb-8 max-w-2xl text-base leading-7 text-[#6b4a3c]">
                  {currentQuestion.subtitle}
                </p>
              )}

              {currentQuestion.type === "single" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {currentQuestion.options?.map((option) => {
                    const selected = answers[currentQuestion.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => updateAnswer(currentQuestion.id, option)}
                        className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${
                          selected
                            ? "border-[#8b5e45] bg-[#8b5e45] text-white shadow-lg"
                            : "border-[#eadbd2] bg-white text-[#2d1b16] hover:border-[#8b5e45]"
                        }`}
                      >
                        <span>{option}</span>
                        {selected && <Check size={20} />}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "multi" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {currentQuestion.options?.map((option) => {
                    const selected =
                      Array.isArray(answers[currentQuestion.id]) &&
                      (answers[currentQuestion.id] as string[]).includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() =>
                          toggleMultiAnswer(currentQuestion.id, option)
                        }
                        className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${
                          selected
                            ? "border-[#8b5e45] bg-[#8b5e45] text-white shadow-lg"
                            : "border-[#eadbd2] bg-white text-[#2d1b16] hover:border-[#8b5e45]"
                        }`}
                      >
                        <span>{option}</span>
                        {selected && <Check size={20} />}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "text" && (
                <input
                  value={
                    typeof answers[currentQuestion.id] === "string"
                      ? (answers[currentQuestion.id] as string)
                      : ""
                  }
                  onChange={(event) =>
                    updateAnswer(currentQuestion.id, event.target.value)
                  }
                  placeholder="Type your answer here..."
                  className="w-full rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                />
              )}

              {currentQuestion.type === "textarea" && (
                <textarea
                  value={
                    typeof answers[currentQuestion.id] === "string"
                      ? (answers[currentQuestion.id] as string)
                      : ""
                  }
                  onChange={(event) =>
                    updateAnswer(currentQuestion.id, event.target.value)
                  }
                  placeholder="Share your details here..."
                  rows={6}
                  className="w-full rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                />
              )}

              {currentQuestion.type === "contact" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={(answers.contact as ContactInfo).firstName}
                    onChange={(event) =>
                      updateContact("firstName", event.target.value)
                    }
                    placeholder="First Name"
                    className="rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                  />

                  <input
                    value={(answers.contact as ContactInfo).lastName}
                    onChange={(event) =>
                      updateContact("lastName", event.target.value)
                    }
                    placeholder="Last Name"
                    className="rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                  />

                  <input
                    value={(answers.contact as ContactInfo).email}
                    onChange={(event) =>
                      updateContact("email", event.target.value)
                    }
                    placeholder="Email"
                    type="email"
                    className="rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                  />

                  <input
                    value={(answers.contact as ContactInfo).phone}
                    onChange={(event) =>
                      updateContact("phone", event.target.value)
                    }
                    placeholder="Phone"
                    type="tel"
                    className="rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#8b5e45] focus:ring-4 focus:ring-[#8b5e45]/10"
                  />

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#eadbd2] bg-white px-5 py-4 text-left text-sm leading-6 text-[#6b4a3c] md:col-span-2">
                    <input
                      type="checkbox"
                      checked={(answers.contact as ContactInfo).consent}
                      onChange={(event) => updateConsent(event.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-[#eadbd2]"
                    />
                    <span>
                      I agree to be contacted by Elena&apos;s Bakehouse by phone,
                      email, or text message regarding my inquiry, updates,
                      offers, and future communications.
                    </span>
                  </label>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={previousStep}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-[#eadbd2] bg-white px-5 py-3 font-semibold text-[#2d1b16] transition hover:border-[#8b5e45] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={nextStep}
              disabled={!canContinue(currentQuestion) || isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-[#2d1b16] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#8b5e45] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === questions.length - 1
                ? isSubmitting
                  ? "Submitting..."
                  : "Submit Inquiry"
                : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
