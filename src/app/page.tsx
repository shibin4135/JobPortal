"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Home = () => {
  const { data } = useSession()
  
  return (
    <div>
      Welcome {data?.user?.name}
    </div>
  )
}

export default Home