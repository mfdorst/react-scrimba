import PropTypes from 'prop-types'

function Die({ value, locked, onClick }) {
  const lockedClass = locked ? 'locked' : ""

  return (
    <div className={`die ${lockedClass}`} onClick={onClick}>
      <h2 className='die-value'>{value}</h2>
    </div>
    
  )
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  locked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Die
