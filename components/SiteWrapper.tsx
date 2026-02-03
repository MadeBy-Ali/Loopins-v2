'use client'

import { useEffect, useState } from 'react'
import CountdownPage from './CountdownPage'

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const [isReleased, setIsReleased] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Release date: February 5th, 2026 at 18:00 WIB (UTC+7)
  const releaseDate = new Date('2026-02-05T18:00:00+07:00').getTime()

  useEffect(() => {
    const checkReleaseStatus = () => {
      const now = new Date().getTime()
      setIsReleased(now >= releaseDate)
      setIsLoading(false)
    }

    checkReleaseStatus()
    
    // Check every second in case user keeps the page open
    const interval = setInterval(checkReleaseStatus, 1000)
    
    return () => clearInterval(interval)
  }, [releaseDate])

  // Prevent flash of content
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-brown flex items-center justify-center">
        <div className="text-light-cream text-xl">Loading...</div>
      </div>
    )
  }

  // Show countdown if not released yet
  if (!isReleased) {
    return <CountdownPage />
  }

  // Show normal site if released
  return <>{children}</>
}
