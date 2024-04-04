import VerticalNav from '@/components/VerticalNav'
import '../styles/globals.css'
import '../styles/navbar.scss'

export const metadata = {
  title: 'Cair Co-Pilot Demo',
  description: 'For Internal Demo Purposes Only',
  icons: {
    icon: "/public/favicon-32x32.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
