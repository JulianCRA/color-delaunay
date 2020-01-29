import React from 'react'
import PropTypes from 'prop-types'

import CornerMenu from '../ui/CornerMenu'
import actions from '../utils/actions'
import styles from './ColorDelaunayMenu.module.css'

import animationImage 	from './assets/buttons/animate.svg'
import downloadImage 	from './assets/buttons/download.svg'
import trianglesImage 	from './assets/buttons/triangles.svg'
import loadImage 		from './assets/buttons/load.svg'

const ColorDelaunayMenu = ({update}) => {
	const height =  window.innerHeight || 
					document.documentElement.clientHeight || 
					document.body.clientHeight

	const elements = [
		{
			type : "button",
			tooltip : "Save the mosaic image to a file.",
			label : "SAVE",
			image : downloadImage,
			small : height < 400,
			action : () => update({action : actions._SAVE})
		},
		{
			type : "button",
			tooltip : "Load another image.",
			label : "LOAD",
			image : loadImage,
			small : height < 400,
			action : () => update({action : actions._DISPLAY_READER})
		},
		{
			type : "button",
			tooltip : "Watch as the triangles are placed progressively.",
			label : "ANIMATE",
			image : animationImage,
			small : height < 400,
			action : () => update({action : actions._ANIMATE})
		},
		{
			type : "button",
			label : "GO!",
			image : trianglesImage,
			small : height < 400,
			action : () => update({action : actions._DELAUNAY})
		}
	]
	
	return(
		<div className = {styles.colorDelaunayMenu}>
			<CornerMenu 
				elements = {elements} 
				position = {{
					bottom:true, 
					toLeft:true
				}} 
			/>
		</div>
		
	)
}

ColorDelaunayMenu.propTypes = {
	update: PropTypes.func.isRequired
}

export default ColorDelaunayMenu




