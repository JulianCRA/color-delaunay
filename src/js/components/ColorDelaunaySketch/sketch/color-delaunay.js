import Delaunator from 'delaunator'

const colorVoronoiSketch = p => {

	let sourceImage
	let delaunayImage
	
	let points
	let delaunay
	const limit = 5000
	let animation = false
	let increment = 1
	let step = 0
	
	p.preload = () => {}
	p.setup = () => {
		p.createCanvas(p._userNode.clientWidth, p._userNode.clientHeight)
		p.noLoop()
		p.imageMode(p.CENTER)
		animation = false
	}
	p.draw = () => {
		if(animation)
			progressiveDelaunay()
	}

	p.customRedraw = (config) => {
		switch(config.action){
			case "SAVE":
				save()
			break
			case "DISPLAY_SKETCH":
				loadNewImage(config.link)
			break
			case "ANIMATE":
				animate()
			break
			case "DELAUNAY":
				toDelaunay()
			break
		}
	}

	const animate = () => {
		p.clear()
		p.loop()
		p.frameRate(5)
		step = 0
		increment = 1
		points = []
		animation = true
	}

	const save = () => {
		p.saveCanvas(delaunayImage, 'colored-delaunay.png')
	}

	const loadNewImage = source => {
		sourceImage = p.loadImage( source, displayNewImage)
	}

	const toDelaunay = () => {
		points = []
		addToDelaunayPointList(limit)
	}

	const displayNewImage = () => {
		const ratio = Math.min(p.width/sourceImage.width, p.height/sourceImage.height)
		const newWidth = Math.floor(sourceImage.width * ratio)
		const newHeight = Math.floor(sourceImage.height * ratio)

		delaunayImage = p.createGraphics(newWidth, newHeight)
		delaunayImage.image(sourceImage, 0, 0, newWidth, newHeight)
		delaunayImage.loadPixels()
		displayDelaunay()
	}

	const displayDelaunay = () => {
		p.clear()
		p.push()
		p.translate(p.width * 0.5, p.height * 0.5)
		p.image(delaunayImage, 0, 0)
		p.pop()
	}

	const progressiveDelaunay = () => {
		addToDelaunayPointList(increment)
		
		if(points.length >= limit){
			p.noLoop()
			animation = false
		}

		step++
		if(step > 30) increment = 10
		if(step > 60) increment = 20
		if(step > 90) increment = 50
		if(step > 120) increment = 100
		if(step > 150) increment = 200
	}

	const addToDelaunayPointList = amount => {
		let x, y
		for(let i = 0; i < amount; i++){
			x = Math.floor(Math.random() * delaunayImage.width-1)
			y = Math.floor(Math.random() * delaunayImage.height-1)
			points.push([x, y])
		}
		delaunay = Delaunator.from(points)
		
		drawTriangles(delaunayImage)
		displayDelaunay()
	}

	const drawTriangles = canvas => {
		function edgesOfTriangle(triangleIndex) { return [3 * triangleIndex, 3 * triangleIndex + 1, 3 * triangleIndex + 2] }

		function pointsOfTriangle(delaunayInstance, triangleIndex) {
			return edgesOfTriangle(triangleIndex)
				.map(edge => delaunayInstance.triangles[edge])
		}

		function forEachTriangle(pointList, delaunayInstance) {
			let triangle
			let pix // pixel at the Centroid of the triangle
			const d = canvas.pixelDensity()
			for (let triangleIndex = 0; triangleIndex < delaunayInstance.triangles.length / 3; triangleIndex++) {
				triangle = pointsOfTriangle(delaunayInstance, triangleIndex).map(pointIndex => pointList[pointIndex])
				
				let xx = Math.round((triangle[0][0]+triangle[1][0]+triangle[2][0])/3)
				let yy = Math.round((triangle[0][1]+triangle[1][1]+triangle[2][1])/3)
				pix = (yy * canvas.width * d + xx) * 4 * d

				if(yy==-1) continue
				canvas.fill(canvas.pixels[pix], canvas.pixels[pix+1], canvas.pixels[pix+2])
				canvas.stroke(canvas.pixels[pix], canvas.pixels[pix+1], canvas.pixels[pix+2])
				canvas.triangle(
					triangle[0][0], triangle[0][1], 
					triangle[1][0], triangle[1][1], 
					triangle[2][0], triangle[2][1]
				)
			}
		}

		canvas.clear()
		forEachTriangle(points, delaunay)
	}
}

export default colorVoronoiSketch