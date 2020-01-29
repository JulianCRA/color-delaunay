import React from 'react'
import PropTypes from 'prop-types'

import ImageDropzone from '../ui/ImageDropzone'

class ImageReader extends React.PureComponent{
	static propTypes = {
		onImageLinkCreated: PropTypes.func.isRequired,
	}

	constructor({startOpen}){
		super();
		this.state = {
			label: "Your image here",
			status: "waiting",
		}

		this.handleDrop = this.handleDrop.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.setImage = this.setImage.bind(this)

		if(startOpen) this.handleClick()
	}

	handleClick(){
		let input = document.getElementById("imageInput") || document.createElement("input")
		
		input.setAttribute("id", "imageInput")
		input.style.display = "none"
		input.setAttribute("type", "file")
		input.setAttribute("accept", "image/jpeg,image/png,image/jpg,.jpeg,.png,.jpg")
		input.onchange = e => {
			this.setImage(e.target.files[0])
			document.body.removeChild(input)
			return false
		}
		input.onclick = function(){this.value = null}
		input.addEventListener('onchange', e => {this.setImage(e.target.files[0])
			return false})
		document.body.appendChild(input)	// Safari on ios
		
		input.click()
	}

	handleDrop(e){
		e.preventDefault()
		const item = e.dataTransfer.items[0]
		if(item.kind === 'file'){
			this.setImage(e.dataTransfer.files[0])
		}else{
			this.setStatus("error", "link not supported")
		}
	}

	setImage(imageFile){
		this.setStatus("loading", "Loading image...")
		if (imageFile.type.match("image.*")) {
			const url = URL.createObjectURL(imageFile)
			this.props.onImageLinkCreated( url )
		}else{
			this.setStatus("error", "Image files only")
		}
	}

	setStatus(st, msg){
		this.setState({status: st, label:msg})
		if(st === 'error')
			setTimeout(() => this.setState({status: "waiting", label:"Your image here"}), 500)
	}

	render(){
		return(
			<ImageDropzone
				label = {this.state.label}
				status = {this.state.status}
				handleClick = {this.handleClick}
				handleDrop = {this.handleDrop}
			/>
		)
	}
}

export default ImageReader