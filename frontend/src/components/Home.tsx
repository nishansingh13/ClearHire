import React from 'react'
import Header from './Header'
import ResumeUpload from './ResumeUpload'
import TopCandidates from './TopCandidates'

function Home() {
  return (
    <>
     <Header/>
      <div className="container mx-auto py-8">
        <ResumeUpload/>
      </div>
      <TopCandidates/>
    </>
  )
}

export default Home