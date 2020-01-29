import React from 'react'
import cx from 'classnames'

import RoundButton from '../RoundButton'
import RoundSlider from '../RoundSlider'
import CircularMenuToggler from '../CircularMenuToggler'

import styles from './CornerMenu.module.css'

const CornerMenu = ({elements, position}) => {
	const [openMenu, setOpenMenu] = React.useState(true)

	const buttons = elements.map(element => {
		switch(element.type){
			case "button":
				return(
					<RoundButton
						tooltip = {element.tooltip}
						label = {element.label}
						image = {element.image}
						action = {element.action}
						position = {position}
						key = {element.label}
						small = {element.small}
					/>
				)
			case "range":
				return(
					<RoundSlider 
						action = {element.action}
						hidden = {!openMenu}
						tooltip = {element.tooltip}
						label = {element.label}
						image = {element.image}
						min = {element.min}
						max = {element.max}
						step = {element.step}
						value = {element.value}
						position={position}
						key = {element.label}
						small = {element.small}
					/>
				)
		}
	})
	
	return(
		<div className = { cx(
				styles.cornerMenu,
				{
					[styles.fromBottom]: position.bottom === true,
					[styles.fromTop]: position.top === true
				}
			)}
		>
			<div className = { cx(
					styles.buttonContainer, 
					{ [styles.closedMenu]: !openMenu }
				)}
			>
				{buttons}
			</div>
			<CircularMenuToggler currentState = {openMenu} action = { () => setOpenMenu(!openMenu) } />
		</div>
	)
}

export default CornerMenu