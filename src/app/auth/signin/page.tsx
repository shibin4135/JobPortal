"use client"
import Link from 'next/link'
import React from 'react'

import { login } from '@/app/lib/auth'

const SignIn = () => {
    const handleGithub=async()=>{
        await login();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center text-center">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome to JobList</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Sign in to post or apply for opportunities
                </p>

                <button onClick={handleGithub} className="flex items-center justify-center gap-3 mt-3 border px-4 py-3 w-[80%] rounded-lg border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition">
                   
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.728-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.304-5.466-1.336-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.649.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.922.43.372.814 1.103.814 2.222 0 1.606-.015 2.902-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="font-medium" >Continue with GitHub</span>
                </button>

                <p className="text-xs text-gray-500 mt-6">
                    By signing in, you agree to our{' '}
                    <Link href="#" className="text-purple-500 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-purple-500 hover:underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignIn
