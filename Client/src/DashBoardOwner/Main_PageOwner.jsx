import React from 'react'
import SidebarOwner from './SidebarOwner'
import StatusOwner from './StatusOwner'


const Main_PageOwner = () => {
  return (
    <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
    <div>
        <SidebarOwner />
    </div>
    <div>
        <StatusOwner />
    </div>
    </div>
  )
}

export default Main_PageOwner