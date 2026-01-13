import Link from 'next/link'
import { ReactNode } from 'react'

interface QuickActionProps {
  href: string
  icon: ReactNode
  label: string
  color: 'purple' | 'blue' | 'emerald' | 'indigo'
}

const colorClasses = {
  purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300',
  blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300',
}

export function QuickAction({ href, icon, label, color }: QuickActionProps) {
  return (
    <Link
      href={href}
      className={`
        border-2 rounded-xl p-4 flex flex-col items-center text-center gap-3 
        transition-all duration-200 hover:scale-[1.02] hover:shadow-sm
        ${colorClasses[color]}
      `}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="font-semibold text-sm whitespace-nowrap">
        {label}
      </span>
    </Link>
  )
}