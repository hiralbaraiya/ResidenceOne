import React from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu,DropdownToggle } from 'reactstrap';

export const Dropdown = (props) => {
  return (
      <UncontrolledDropdown>
        <DropdownToggle nav >
          {props.icon}
        </DropdownToggle>
        <DropdownMenu >
          {props.list.map((item) => {
            return(
              <DropdownItem>
              {item}
            </DropdownItem>
            )  
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
  )
}