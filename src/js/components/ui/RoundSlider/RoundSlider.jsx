import React from 'react'
import classNames from 'classnames'

import generalStyles from '../RoundButton/RoundButton.module.css'
import styles from './RoundSlider.module.css'

const RoundSlider = ({tooltip, label, image, hidden, min, max, value, step, position, action, small = false}) => {
	const [isSliderActive, toggleSlider] = React.useState(false)

	if(hidden && isSliderActive) toggleSlider(false)

	const cn = classNames(
		generalStyles.roundButton,
		styles.menuSlider,
		{
			[generalStyles.smallButton] : small,
			[styles.menuSliderHidden] : !isSliderActive,
		}
	)

	return(
		<div 
			data-tooltip = {tooltip} 
			className = {cn}  
		>
			<div className = {generalStyles.buttonImage} onClick = {() => toggleSlider(!isSliderActive)}>
				<img src={image} alt=""/>
			</div>
			<label> {label} </label>
			<div className = {classNames(
					styles.sliderBg,
					{
						[styles.deployToRight] : position.toRight,
						[styles.deployToLeft] : position.toLeft
					}
				)}
			>
				<input	onChange = { e => action(e.target.value) }
						defaultValue = {value}
						className = {styles.slider}
						type = "range" 
						min = {min} 
						max = {max} 
						step = {step} 
				/>
			</div>
		</div>
	)
}

/*RoundSlider.propTypes = {
	tooltip: PropTypes.string,
	label: PropTypes.string,
	clickAction: PropTypes.func.isRequired,
	image: PropTypes.string,
	position: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired
}*/

export default React.memo(RoundSlider)