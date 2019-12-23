import React, { Component } from 'react';

import PriceList from '../components/PriceList'
import ViewTabs from '../components/ViewTabs'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateButton from '../components/CreateButton'
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth} from '../utility'
const categories = {
    "1": {
        "id": "1",
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    "2": {
        "id": "2",
        "name": "出行",
        "type": "outcome",
        "iconName": "ios-car"
    },
}
const items = [
    {
        "id": 1,
        "title" : "去旅游",
        "price" : 200,
        "date": "2018-09-10",
        "cid": "1"
    },
    {
        "id": 2,
        "title" : "去旅游",
        "price" : 300,
        "date": "2018-09-10",
        "cid": "2"
    }
]

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
    }
    render(){
        const {items, currentDate, tabView} = this.state
        const itemsWithCategory = items.map(item =>　{
            item.category = categories[item.cid]
            return item
        })
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach((item) => {
            if(item.category.type === TYPE_INCOME){
                totalIncome += item.price
            }else{
                totalOutcome += item.price
            }
        })
        return(
            <>
                <header className="App-header">
                    <div className="row">
                        <div className="col">
                            <MonthPicker
                                year={currentDate.year}
                                month={currentDate.month}
                                onChange={() =>{}}
                            />
                        </div>
                        <div className="col">
                            <TotalPrice 
                                income={totalIncome}
                                outcome={totalOutcome}
                            />
                        </div>
                    </div>
                </header>
                <div className="content-area py-3 px-3">
                    <ViewTabs 
                        activeTab={tabView}
                        onTabChange={() => {}}
                    />
                    <CreateButton
                        onClick={() => {}}
                    />
                    <PriceList
                        items={itemsWithCategory}
                        onModifyItem={()=> {}}
                        onDeleteItem={() => {}}
                    />
                </div>
            </>
        )
    }
}

export default Home