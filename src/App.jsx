import { Suspense, lazy } from "react"


const Home = lazy(() => import ("./Home"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />    
    </Suspense>
  )
}

export default App