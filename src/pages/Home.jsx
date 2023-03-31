import {useContext, useEffect} from 'react'
import Hero from '../components/layout/Hero'
import Stat from '../components/reusable/Stat'
import WorldStatsContext from '../context/WorldStatsContext'
import Spinner from '../components/reusable/Spinner'

function Home() {

  const {
    getWorldStats, 
    worldStats,
    worldStatsLoading,
    highestCases,
    lowestCases,
    highestDeaths,
    lowestDeaths,
    highestTests,
    lowestTests,
  } = useContext(WorldStatsContext)

  useEffect( () => {
    getWorldStats()
    console.log(worldStats)
  }, [])

  return (
    <div className="home">
      <Hero />
      { 
        worldStatsLoading &&
          (
            <Spinner />
          )
      }
      { 
        !worldStatsLoading && worldStats.length &&
          (
            <div className="container mx-auto py-5 mb-5">
              <h2 className="text-4xl text-center mx-6 pt-6 my-6 font-bold">Countries on Alert</h2>
              <div className="stats stats-vertical shadow mx-auto flex flex-col content-center">
                <Stat 
                  title="Highest Death Rate"
                  country={highestDeaths.country}
                  number={highestDeaths.rate}
                  color="danger" />
                <Stat 
                  title="Highest Case Rate"
                  country={highestCases.country}
                  number={highestCases.rate}
                  color="danger" />
                <Stat 
                  title="Lowest Test Availability"
                  country={lowestTests.country}
                  number={lowestTests.rate}
                  color="danger" />
              </div>
              <h2 className="text-4xl text-center mx-5 pt-6 my-6 font-bold">Countries Performing Well</h2>
              <div className="stats stats-vertical shadow mx-auto flex flex-col content-center pb-5">
                <Stat 
                  title="Lowest Death Rate"
                  country={lowestDeaths.country}
                  number={lowestDeaths.rate}
                  color="safe" />
                <Stat 
                  title="Lowest Case Rate"
                  country={lowestCases.country}
                  number={lowestCases.rate}
                  color="safe" />
                <Stat 
                  title="Highest Test Availability"
                  country={highestTests.country}
                  number={highestTests.rate}
                  color="safe" />
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Home
