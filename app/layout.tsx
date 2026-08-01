import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SiteFlow',
  description: 'Offline-first Job Site Tool',
  manifest: '/manifest.json',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
