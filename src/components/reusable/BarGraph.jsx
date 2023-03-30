import PropTypes from 'prop-types'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)


function BarGraph( { title, countryStat, worldStat } ) {

  return (
    <div className="flex-1 container p-6 mx-auto">
        <h3 className="text-center text-xl lg:text-4xl weight-500 mb-3 underline">{ title }</h3>
        <Bar 
            data={
                {
                    labels: [`${ title }/million`],
                    datasets: [
                        {
                            label: 'Country',
                            data: [countryStat],
                            borderWidth: 1,
                            backgroundColor: '#1AE6CC'
                        },
                        {
                            label: 'World',
                            data: [worldStat],
                            borderWidth: 1,
                            backgroundColor: 'rgb(102,26,230)'
                        }
                    ],
                    options: {
                        responsive: true
                    }
                }
            }
        />
    </div>
  )
}

BarGraph.propTypes = {
    title: PropTypes.string.isRequired,
    countryStat: PropTypes.number.isRequired,
    worldStat: PropTypes.number.isRequired,
}

export default BarGraph
