import type { Metadata } from 'next';
import './globals.css';
import SessionWrap from './SessionProvider';

export const metadata: Metadata = {
  title: 'Taskmatic — AI Automation That Just Works',
  description: 'AI automation templates for solo business owners. No coding. No prompts. Just results.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrap>{children}</SessionWrap>
      </body>
    </html>
  );
}
