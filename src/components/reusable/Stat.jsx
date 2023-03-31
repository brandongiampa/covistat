import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Stat( { title, country, number, color } ) {
  return (
    <div className="stat flex flex-col text-center">
        <div className={`stat-title text-${color} font-thick text-lg`}>{number}/million</div>
        <div className="stat-value mb-2">{title}: {country}</div>
        <div className="stat-desc">
            <Link to={`/countries/${country}`} className="link text-info">More info</Link>
        </div>
    </div>
  )
}

Stat.propTypes = {
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Stat
