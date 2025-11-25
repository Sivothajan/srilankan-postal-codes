import "./globals.css";

import { Mail } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col items-center justify-center bg-background text-foreground font-sans">
        <div className="w-full max-w-md px-4 py-10 text-center space-y-6">
          {/* Icon & Title */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-muted">
              <Mail className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-6xl font-bold tracking-tighter text-foreground">
              404
            </h1>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Page Not Found
            </h2>
            <p className="mt-2 text-muted-foreground">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          {/* Action Button */}
          <Button asChild size="lg" className="mt-8">
            <a href="/">Go back home</a>
          </Button>
        </div>
      </body>
    </html>
  );
}
