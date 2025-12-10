"use client";

import Providers from "./providers";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
