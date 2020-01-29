import React from 'react'
import cx from 'classnames'

import styles from './CircularMenuToggler.module.css'

const CircularMenuToggler = ({currentState, action}) => {
	return(
		<div className = {styles.menuToggler}>
			<button 
				onClick = {action} 
				className = { cx(
					styles.hamburger,
					styles.hamburgerSpin,
					{ [styles.isActive]: currentState }
				)}
				type="button">
				<span className = {styles.hamburgerBox}>
					<span className = {styles.hamburgerInner} />
				</span>
			</button>
		</div>
	)
}

export default CircularMenuToggler