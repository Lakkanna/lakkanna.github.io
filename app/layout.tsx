import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { PERSONAL_INFO, SOCIAL_LINKS, EXTERNAL_LINKS } from '@/constants'
import Chat from '@/components/Chat'

const dankMono = localFont({
  src: [
    {
      path: '../fonts/DankMono/Web-PS/DankMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/DankMono/Web-PS/DankMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/DankMono/Web-PS/DankMono-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-dank-mono',
})

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.fullName} | ${PERSONAL_INFO.title}`,
  description: 'Performance-driven Senior Software Engineer with expertise in Full Stack engineering, Front-End development, system architecture, and AI-powered solution design.',
  keywords: ['Senior Software Engineer', 'Full Stack Engineering', 'Front-End Development', 'System Architecture', 'AI-powered Solution Design'],
  authors: [{ name: PERSONAL_INFO.fullName, url: SOCIAL_LINKS.linkedin }],
  creator: PERSONAL_INFO.fullName,
  publisher: PERSONAL_INFO.fullName,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: `${PERSONAL_INFO.fullName} - ${PERSONAL_INFO.title}`,
    description: 'Performance-driven Senior Software Engineer with expertise in Full Stack engineering, Front-End development, system architecture, and AI-powered solution design.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link href={EXTERNAL_LINKS.materialSymbols} rel="stylesheet" />
      </head>
      <body className={`${dankMono.variable} font-display bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark`}>
        {children}
        <Chat />
      </body>
    </html>
  )
}

