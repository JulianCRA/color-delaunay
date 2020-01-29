import Delaunator from 'delaunator'

const colorVoronoiSketch = p => {

	let sourceImage
	
	let pixelMap
	let board
	let legoifiedImage
	let brickSize

	let animation
	let index
	const maxBricks = 50
	const minSize = 20

	p.preload = () => {}
	p.setup = () => {
		p.createCanvas(p._userNode.clientWidth, p._userNode.clientHeight)
		p.noLoop()
		p.imageMode(p.CENTER)
		p.background("forestgreen")
		animation = false
	}
	p.draw = () => {
		if(animation)
			brickByBrick()
	}

	p.customRedraw = (config) => {
		console.log(config)
		// switch(config.action){
		// 	case "SAVE":
		// 		save()
		// 	break
		// 	case "DISPLAY_SKETCH":
		// 		loadNewImage(config.link)
		// 	break
		// 	case "SHUFFLE":
		// 		shuffle()
		// 	break
		// 	case "ANIMATE":
		// 		animate()
		// 	break
		// 	case "LEGOIFY":
		// 		legoify()
		// 	break
		// }
	}

	const save = () => {
		p.saveCanvas(legoifiedImage, 'legoified.png')
	}

	const animate = () => {
		p.loop()
		p.clear()
		legoifiedImage.clear()
		index = 0
		animation = true
	}

	const shuffle = () => {
		board.reset()
		board.fillGrid()
		legoify()
	}

	const legoify = () => {
		p.clear()
		legoifiedImage.clear()
		board.bricks.map(
			brick => drawBrick(legoifiedImage, brick)
		)
		displayLegoified()
	}

	const loadNewImage = source => {
		sourceImage = p.loadImage( source, displayNewImage)
	}

	const brickByBrick = () => {
		const bricksAmount = Math.ceil(board.bricks.length / 100)
		
		for(let i = 0; i < bricksAmount; i++){
			if(index < board.bricks.length)
				drawBrick(legoifiedImage, board.bricks[index])
			else{
				p.noLoop()
				animation = false
			}
			index++
		}
		
		displayLegoified()
	}

	const displayNewImage = () => {
		const ratio = Math.min(p.width/sourceImage.width, p.height/sourceImage.height)
		const newWidth = sourceImage.width * ratio
		const newHeight = sourceImage.height * ratio

		p.image(sourceImage, p.width * 0.5, p.height * 0.5, newWidth, newHeight)

		brickSize =  Math.min(Math.floor(Math.max(newWidth, newHeight) / maxBricks), minSize)
		const gridWidth = Math.floor(newWidth / brickSize)
		const gridHeight = Math.floor(newHeight / brickSize)
		board = new LegoBoard(gridWidth, gridHeight, sourceImage)

		pixelMap = p.createGraphics(board.width, board.height)
		pixelMap.image(sourceImage, 0, 0, pixelMap.width, pixelMap.height)
		pixelMap.loadPixels()

		legoifiedImage = p.createGraphics(gridWidth * brickSize, gridHeight * brickSize)
		board.bricks.map(
			brick => drawBrick(legoifiedImage, brick)
		)
	}

	const displayLegoified = () => {
		p.clear()
		p.push()
		p.translate(p.width * 0.5, p.height * 0.5)
		p.image(legoifiedImage, 0, 0)
		p.pop()
	}

	const drawBrick = (canvas, brick) => {
		const color = averageZoneColor(brick)
		if(!color) return

		canvas.fill(color)
		canvas.strokeWeight(1)
		canvas.stroke(0, 0, 0, 100)
		canvas.rect(brick.x*brickSize, brick.y*brickSize, brick.w*brickSize, brick.h*brickSize)

		canvas.fill(0, 0, 0, 40)
		canvas.strokeWeight(0.5)
		for(let i = 0; i < brick.w; i++)
			for(let j = 0; j < brick.h; j++)
				canvas.circle((brick.x + i + 0.5) * brickSize, (brick.y + j + 0.5) * brickSize, brickSize * .5)
	}

	const averageZoneColor = ({x, y, w, h}) => {
		let r = 0
		let g = 0
		let b = 0
		let a = 0
		const d = p.pixelDensity()
		let pixpos
		for(let i = x; i < x+w; i++){
			for(let j = y; j < y+h; j++){
				pixpos = (j * pixelMap.width * d + i) * 4 * d
				
				r += pixelMap.pixels[pixpos+0]
				g += pixelMap.pixels[pixpos+1]
				b += pixelMap.pixels[pixpos+2]
				a += pixelMap.pixels[pixpos+3]
			}
		}
		if(a===0) return false
		
		return [r/(w*h), g/(w*h), b/(w*h)]
	}
}

export default colorVoronoiSketch