import './globals.css';
import { Inter } from 'next/font/google';
import Link from "next/link";

const inter = Inter( { subsets: [ 'latin' ] } )

export const metadata = {
  title: 'Greg\'s Portfolio of Small Bets',
  description: 'Tech courses and books',
  keywords: 'passive income, small bets, tech courses, tech books, tech tutorials'
}

export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              Greg's Portfolio of Small Bets
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about/contact">Contact</Link></li>
              <li><Link href="/githubusers">GitHub Users</Link></li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
