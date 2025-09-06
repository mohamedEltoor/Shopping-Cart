import React from 'react'
import storeItems from '../data/storeItems.json'
import StoreItem from './StoreItem'
function Store() {
  return (
    <div className="store">
      <h1 style={{color:"#ffdfb9"}}>Store</h1>
      <div className="store-grid">
        {storeItems.map((item)=>(
        <div key={item.id} >
        <StoreItem {...item}/>
      </div>))
      }
      </div>
    </div>
  )
}

export default Store
