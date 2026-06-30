import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../src/index.css'
import Providers from '../src/components/Providers'
import Footer from '../src/components/Footer'

export const metadata: Metadata = {
  title: 'DIY Network',
  description: 'A home for makers — cooking, painting, gardening, sewing, and crafting.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Protest+Strike&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
