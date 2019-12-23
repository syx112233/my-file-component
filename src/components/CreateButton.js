import React from 'react'
import Ionicon from 'react-ionicons'
const CreateButton = () => {

    return(
        <button className="btn btn-primary"
            style={{width:'100%'}}
            onClick={()=> {}}
        >
            <Ionicon
            fontSize="24px"
            style={{marginBottom: '3px',marginRight: '3px'}}
            color={'#fff'}
            icon='ios-add-circle'
            />创建一条新的记账记录
        </button>
    )
}

export default CreateButton