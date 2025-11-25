"use client";

import "./globals.css";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-full flex-col items-center justify-center bg-background p-4 text-foreground font-sans">
        <div className="w-full max-w-lg rounded-xl border border-border bg-card p-8 shadow-lg text-center space-y-6">
          {/* Icon Section */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              500 – Server Error
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong on our end. We are working to fix it.
            </p>

            {error.message && (
              <pre className="mt-4 max-h-32 overflow-auto rounded-md bg-muted p-3 text-xs font-mono text-destructive text-left">
                {error.message}
              </pre>
            )}
          </div>

          {/* Action Button */}
          <Button onClick={() => reset()} className="w-full" size="lg">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
