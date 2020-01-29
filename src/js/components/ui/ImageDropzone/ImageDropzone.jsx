import React, {useState} from "react"
import PropTypes from "prop-types"
import classNames from 'classnames'
import styles from './ImageDropzone.module.css'

const ImageDropzone = ({ label, status, handleClick, handleDrop, handleDragOver }) => {
	const [dragIn, setDragIn] = useState(false)
	
	const cn = classNames(
		styles.imageDropZone,
		{
			[styles.dragEnter] : dragIn && status !== 'waiting',
			[styles.error] : status === 'error',
			[styles.loading] : status === 'loading'
		}
	)
	
	return(
		<div
			className = {cn}
			onClick = {handleClick}
			onDrop = {handleDrop}
			onDragEnter ={() => setDragIn(true)}
			onDragLeave ={() => setDragIn(false)}
			onDragOver = { handleDragOver || ( e => {e.preventDefault();e.stopPropagation();}) } 
		>
			<label>{label}</label>
			{
				status === 'loading' ? 
					<div className = {styles.ldsHourglass} /> :
					null
			}
		</div>
	);
}

ImageDropzone.propTypes = {
	label: PropTypes.string.isRequired,
	error: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	handleDrop: PropTypes.func.isRequired,
	handleDragOver: PropTypes.func
};

export default ImageDropzone
