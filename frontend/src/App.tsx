
import './App.css'
import Header from './components/Header'
import TopCandidates from './components/TopCandidates'
import ResumeUpload from './components/ResumeUpload'

function App() {
 

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

export default App
