const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
    return(
      <div className="tab-buttons">
      {buttons.map(button =>{
         return <button className={button === activeTab? 'tab active': 'tab inactive'} onClick={()=>changeTab(button)}>{button}</button>
      })}
      </div>
    )
  }
  export default TabButtons;