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
            <div className="container mx-auto py-1">
              <h2 className="text-4xl text-center mx-4 my-6 font-bold">Countries on Alert</h2>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <Stat 
                  title="Most Deaths"
                  country={highestDeaths.country}
                  number={highestDeaths.rate}
                  color="danger" />
                <Stat 
                  title="Highest Case Rate"
                  // country="Brazil"
                  // number="12"
                  country={highestCases.country}
                  number={highestCases.rate}
                  color="danger" />
                <Stat 
                  title="Least Available Tests"
                  country={lowestTests.country}
                  number={lowestTests.rate}
                  color="danger" />
              </div>
              <h2 className="text-4xl text-center mx-4 my-6 font-bold">Countries Performing Well</h2>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <Stat 
                  title="Least Deaths"
                  country={lowestDeaths.country}
                  number={lowestDeaths.rate}
                  color="safe" />
                <Stat 
                  title="Least Cases"
                  country={lowestCases.country}
                  number={lowestCases.rate}
                  color="safe" />
                <Stat 
                  title="Most Available Tests"
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
