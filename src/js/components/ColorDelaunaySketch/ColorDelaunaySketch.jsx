import React from 'react'
import PropTypes from 'prop-types'
import P5Wrapper from '../utils/P5Wrapper'
import colorDelaunaySketch from './sketch/color-delaunay.js'

const ColorDelaunaySketch = ({config}) => {
	const propTypes = {
		config : PropTypes.shape({
			link: PropTypes.string.isRequired,
			action: PropTypes.func.isRequired
		}).isRequired
	}
	
	return (
		<P5Wrapper 
			sketch = {colorDelaunaySketch} 
			config = {config}>
		</P5Wrapper>
	)
}

export default ColorDelaunaySketch