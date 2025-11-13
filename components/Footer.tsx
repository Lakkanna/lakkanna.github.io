import Link from 'next/link'
import SocialIcons from './SocialIcons'
import { ROUTES, PERSONAL_INFO } from '@/constants'

export default function Footer() {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center @container border-t border-gray-200/50 dark:border-gray-700/50 bg-background-light dark:bg-background-dark">
      <div className="flex justify-center">
        <SocialIcons size="md" layout="horizontal" />
      </div>
    </footer>
  )
}

