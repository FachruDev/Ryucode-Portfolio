"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

type Status = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  }

  const label = status === "copied" ? "Copied" : "Copy email";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <motion.button
        type="button"
        onClick={copy}
        whileTap={{ scale: 0.96 }}
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-on-primary/30 px-5 font-medium text-on-primary transition-colors hover:bg-on-primary/10 focus-visible:outline-on-primary"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={status === "copied" ? "check" : "copy"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
            aria-hidden="true"
          >
            {status === "copied" ? <Check className="size-4" strokeWidth={2.25} /> : <Copy className="size-4" strokeWidth={2} />}
          </motion.span>
        </AnimatePresence>
        {label}
      </motion.button>
      <p role="status" aria-live="polite" className="text-sm text-on-primary/80">
        {status === "copied" && "Email address copied to your clipboard."}
        {status === "failed" && "Clipboard access is blocked. Select the address above to copy it."}
      </p>
    </div>
  );
}
