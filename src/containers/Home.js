import React, { Component } from 'react';

import PriceList from '../components/PriceList'
import ViewTabs from '../components/ViewTabs'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateButton from '../components/CreateButton'
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth,padLeft} from '../utility'
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
        "date": "2019-11-10",
        "cid": "1"
    },
    {
        "id": 2,
        "title" : "去旅游",
        "price" : 300,
        "date": "2019-10-10",
        "cid": "2"
    }
]

const newItem = {
    "id": 3,
    "title": "新添加项目",
    "price": 250,
    "date": "2019-09-10",
    "cid": "2"
}

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
    }
    changeView =(view) =>{
        this.setState({
            tabView: view
        })
    }
    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })
    }
    modifyItem = (modifiedItem) => {
        const modifiedItems = this.state.items.map(item =>{
            if(item.id === modifiedItem.id){
                return{...item, title: '更新后的标题'}
            }else{
                return item
            }
        })
        this.setState({
            items: modifiedItems
        })
    }
    createItem = () =>{
        this.setState({
            items: [newItem, ...this.state.items]
        })
    }
    deleteItem = (deletedItem) => {
        const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id)
        this.setState({
            items: filteredItems
        })
    }
    render(){
        const {items, currentDate, tabView} = this.state
        const itemsWithCategory = items.map(item =>　{
            item.category = categories[item.cid]
            return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
                                onChange={this.changeDate}
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
                        onTabChange={this.changeView}
                    />
                    <CreateButton
                        onClick={this.createItem}
                    />
                    {
                        tabView === LIST_VIEW && 
                        <PriceList
                            items={itemsWithCategory}
                            onModifyItem={this.modifyItem}
                            onDeleteItem={this.deleteItem}
                        />
                    }
                    {
                        tabView === CHART_VIEW && 
                        <h2>这是图表</h2>
                    }
                </div>
            </>
        )
    }
}

export default Home