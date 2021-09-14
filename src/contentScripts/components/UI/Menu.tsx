import React, { Fragment } from 'react'
import ToggleButton from './ToggleButton'
import LinkButton from './LinkButton'


type LinkButtonConfigType = 
{
id: string,
name: string,
dataStatus: string,
url: string
}

type ToggleButtonConfigType = 
{
  id: string,
  name:string,
  dataStatus: string,
  toggleFn: (value:boolean) => void 
}
const Menu: React.FC<{toggleBtns: ToggleButtonConfigType[], linkBtns: LinkButtonConfigType[]}> = (props) => {

  return (
    <Fragment>
      {props.toggleBtns.map((toggleButton) => {
        return (
          <ToggleButton
            id={toggleButton.id}
            key={toggleButton.id}
            onCheck={toggleButton.toggleFn}
            contentStatus={toggleButton.dataStatus}
          >
            {toggleButton.name}
          </ToggleButton>
        )
      })}

      {props.linkBtns.map((linkButton) => {
        return (
          <LinkButton
            id={linkButton.id}
            key={linkButton.id}
            contentStatus={linkButton.dataStatus}
            url={linkButton.url}
          >
            {linkButton.name}
          </LinkButton>
        )
      })}
    </Fragment>
  )
}

export default Menu
