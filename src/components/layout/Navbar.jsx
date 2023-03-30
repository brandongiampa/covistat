import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-primary">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">Covistat</Link>
        </div>
        <div className="flex-none">
            <a target="_blank" rel="noreferrer" href="https://cdc.gov" className="btn btn-ghost">CDC Info</a>
        </div>
    </div>
  )
}

export default Navbar
