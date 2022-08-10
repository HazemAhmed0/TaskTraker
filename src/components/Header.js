import PropTypes from 'prop-types'
import '../styles/main.css';

const Header = ({ title }) => {
  return (
    <header>
    <h1>{title}</h1>
    <button className='btn'>Add New Task</button>
    </header>
  )
}

Header.defaultPtops = {
    title: 'Generic Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header