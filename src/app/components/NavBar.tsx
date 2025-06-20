"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { logout } from '../lib/auth'

const NavBar = () => {
  const {status} = useSession();

  if(status==="loading"){
    return <div>Loading.....</div>
  }

  return (
    <div className='flex justify-around py-4 px-4 items-center shadow-lg rounded-lg '>
      <div>
        <h1 className='font-bold text-2xl'>Job Board</h1>
      </div>
      <div className='space-x-3 text-sm font-semibold flex items-center'>

        {
          status==="authenticated" ? (<>
          <Link href={'/jobs'}> Browse  the Jobs</Link>
            <Link href={'/post-job'}> Post a Job</Link>
            <Link href={'/dashboard'}>Dashboard</Link>
            <button onClick={async()=>await logout()}>Signout</button>
          </>
          ) : (
            <>
              <Link href={'/auth/signin'}>Sign In</Link>
              <Link href={'/jobs'}>Browse Jobs</Link>
              </>
          )
        }

      </div>
    </div>
  )
}

export default NavBar