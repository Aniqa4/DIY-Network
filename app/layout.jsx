import '../src/index.css'
import ReduxProvider from '../src/redux/provider'
import Footer from '../src/Components/Footer'

export const metadata = {
  title: 'DIY Network',
  description: 'A home for makers — cooking, painting, gardening, sewing, and crafting.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Protest+Strike&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
