import React from 'react'
import PropTypes from 'prop-types'
import {padLeft, range} from '../utility'
class MonthPicker extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedYear: this.props.year,
            selectedMonth: this.props.month
        }
    }
    componentDidMount(){
        document.addEventListener('click', this.closePicker, false)
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.closePicker, false)
    }
    closePicker = () => {
        this.setState({
            isOpen: false
        })
    }
    toggleDropdown = (event) => {
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
            isOpen:!this.state.isOpen,
           
        })
    }
    selectYear = (event, yearNumber) => {
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
            selectedYear: yearNumber
        })
    }
    selectMonth = (event, monthNumber) => {
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
            isOpen: false,
            selectedMonth: monthNumber
        })
        this.props.onChange(this.state.selectedYear, monthNumber)
    }
    render(){
        const {year, month} = this.props
        const {isOpen, selectedYear, selectedMonth} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(number => number + year)
        return(
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary
                 dropdown-toggle"
                    onClick={this.toggleDropdown}
                 >
                     {`${selectedYear}年 ${padLeft(selectedMonth)}月`}
                 </button>

                 { isOpen &&
                    <div className="dropdown-menu" style={{display:'block'}}>
                        <div className="row">
                            <div className="col border-right">
                                {
                                    yearRange.map((yearNumber, index) =>
                                        <a key={index} 
                                            href="#"
                                            onClick={(event) => {this.selectYear(event,yearNumber)}}
                                            className={(yearNumber === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}>
                                            {yearNumber}年
                                        </a>
                                    )
                                }
                            </div>
                            <div className="col">
                                {
                                    monthRange.map((monthNumber, index) =>
                                        <a key={index} 
                                            href="#"
                                            onClick={(event) =>　{this.selectMonth(event, monthNumber)}}
                                            className={(monthNumber === month) ? 'dropdown-item active' : 'dropdown-item'}>
                                            {padLeft(monthNumber)}月
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                 }
            </div>
        )
    }
}
MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
export default MonthPicker