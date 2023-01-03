import '../styles/globals.css'
import Header from './components/header'
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="bg-black h-full w-full overflow-hidden">
        <Header />
        <main className="max-w-md mx-auto pt-12 bg-gray-900 h-screen overflow-auto">
         {children}
        </main>
      </body>
    </html>
  )
}
