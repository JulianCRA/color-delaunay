import React from 'react'
import ColorDelaunaySketch from '../ColorDelaunaySketch'
import ColorDelaunayMenu from '../ColorDelaunayMenu'
import ImageReader from '../ImageReader'
import actions from '../utils/actions'

import styles from './ColorDelaunay.module.css'

const ColorDelaunay = () => {
	const [config, setConfig] = React.useState({
		action: actions._DISPLAY_READER,
		link: null
	})

	const updateLink = link => {
		setConfig({
			action: actions._DISPLAY_SKETCH,
			link: link
		})
	}

	const updateAction = a => {
		if(config.link){
			setConfig({
				...config, 
				action: a.action
			})
		}
	}

	const content = (config.action === actions._DISPLAY_READER) ?
		<ImageReader onImageLinkCreated = { updateLink } startOpen = { config.link !== null }/> : 
		<ColorDelaunaySketch config = {config} />

	return(
		<div className = {styles.colorDelaunayContainer}>
			{ content }
			<ColorDelaunayMenu update = {updateAction} />
		</div>
	)
}

export default ColorDelaunay