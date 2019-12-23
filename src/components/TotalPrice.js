import React from 'react'
import PropTypes from 'prop-types'
const TotalPrice = ({income, outcome}) => {

    return(
        <div className="d-flex justify-content-between px-5 py-4">
            <span className="font-weight-bold">收入:{income}</span>
            <span className="font-weight-bold">支出:{outcome}</span>
        </div>
    )
}

TotalPrice.propTypes = {
    income: PropTypes.number.isRequired,
    outcome: PropTypes.number.isRequired
}

export default TotalPrice