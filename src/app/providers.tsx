'use client'

// ** React
import { useEffect } from "react"

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Chỉ khởi tạo PostHog khi có token
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
                person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
                capture_pageview: true,  // auto track pageview
                capture_pageleave: true, // track when user leave page
                autocapture: true,       // click, submit, input, ...
                defaults: '2025-05-24'
            })
        } else if (process.env.NODE_ENV === 'development') {
            console.warn('PostHog token not found - Analytics disabled')
        }
    }, [])

    return (
        <PHProvider client={posthog}>
            {children}
        </PHProvider>
    )
}
