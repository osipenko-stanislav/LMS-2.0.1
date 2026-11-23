import { useState } from "react";
import {
  GoogleIcon,
  Github01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { Button, Checkbox, Icon, Input, Label } from "@/lib";
import { cn } from "@/lib/utils/cn";

const PANEL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0d3fab"/><stop offset="0.55" stop-color="#1664ff"/><stop offset="1" stop-color="#4785ff"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#g)"/>
    <circle cx="640" cy="180" r="260" fill="#ffffff" opacity="0.10"/>
    <circle cx="120" cy="820" r="200" fill="#ffffff" opacity="0.08"/>
    <circle cx="700" cy="760" r="90" fill="#ffffff" opacity="0.10"/>
  </svg>`,
)}`;

export function LoginExample() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1400);
  };

  return (
    <div className="flex h-full">
      {/* Form side */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex items-center gap-2 p-6">
          <span className="grid size-6 place-items-center rounded-md bg-accent text-xs font-bold text-white">
            A
          </span>
          <span className="text-sm font-semibold">Acme</span>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm">
            <h1 className="text-xl font-semibold tracking-[-0.01em]">
              Sign in to Acme
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Welcome back. Enter your details to continue.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Button variant="secondary" className="w-full justify-center gap-2">
                <Icon icon={GoogleIcon} size={16} /> Continue with Google
              </Button>
              <Button variant="secondary" className="w-full justify-center gap-2">
                <Icon icon={Github01Icon} size={16} /> Continue with GitHub
              </Button>
            </div>

            <div className="my-5 flex items-center gap-3 text-2xs text-text-tertiary">
              <span className="h-px flex-1 bg-border-subtle" />
              OR
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@acme.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-pw">Password</Label>
                  <a
                    href="#"
                    className="text-xs text-text-link hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="login-pw"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="pr-9"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPw ? "Hide password" : "Show password"}
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-1.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-xs text-text-tertiary transition-colors hover:bg-fill-hover hover:text-text-primary"
                  >
                    <Icon icon={showPw ? ViewOffIcon : ViewIcon} size={15} />
                  </button>
                </div>
              </div>

              <Checkbox label="Keep me signed in" defaultChecked />

              <Button
                type="submit"
                variant="primary"
                className="mt-1 w-full justify-center"
                disabled={submitting}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-text-tertiary">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-text-link hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-between px-6 py-4 text-2xs text-text-tertiary">
          <span>© 2026 Acme, Inc.</span>
          <span className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-text-secondary">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-text-secondary">Terms</a>
          </span>
        </footer>
      </div>

      {/* Brand side */}
      <div
        className={cn(
          "relative hidden w-[42%] shrink-0 overflow-hidden lg:block",
        )}
      >
        <img src={PANEL} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex h-full flex-col justify-end p-10 text-white">
          <blockquote className="text-lg leading-relaxed font-medium">
            “We moved our whole team over in an afternoon. It's the first tool
            everyone actually wants to open.”
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-white/20 text-sm font-semibold">
              GH
            </span>
            <div className="text-sm">
              <p className="font-medium">Grace Hopper</p>
              <p className="text-white/70">VP Engineering, Globex</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
