//Tile Class
class Tile {
	constructor(element, name, sideA, sideB) {
		this.name = name,
		this.element = element,
		this.sideA = [sideA, true],
		this.sideB = [sideB, true],
		this.double = sideA === sideB,
		this.boardSide = null,
		this.sideExposed = null
	}
	rotateTile(element = this.element) {

		if (element.classList.contains('dominoH')) {

			element.querySelectorAll('.side-H').forEach(elem => {
				elem.classList.remove('side-H')
				elem.classList.add('side-V')

				elem.childNodes.forEach(elem2 => {
					elem2.classList.remove('side-H-dot')
					elem2.classList.add('side-V-dot')
				})
			})
			element.classList.remove('dominoH')
			element.classList.add('dominoV')
		}
		else {
			element.querySelectorAll('.side-V').forEach(elem => {
				elem.classList.remove('side-V')
				elem.classList.add('side-H')

				elem.childNodes.forEach(elem2 => {
					elem2.classList.remove('side-V-dot')
					elem2.classList.add('side-H-dot')
				})
			})
			element.classList.remove('dominoV')
			element.classList.add('dominoH')
		}

	}
	switchSide(angle, element = this.element) {
		element.setAttribute('style', `transform: rotate(${angle}deg)`)
	}
}

function generateDominoesTiles() {
	const tiles = []
	for (let i = 0; i <= 6; i++) {
		for (let j = i; j <= 6; j++) {

			const domino = document.createElement('div')

			domino.classList.add('dominoV')

			const sideA = document.createElement('div')
			sideA.classList.add('side-V')

			for (let x = 0; x < 3; x++) {

				const div = document.createElement('div')
				div.classList.add('side-V-dot')

				for (let y = 0; y < parseInt(guide[i][x]); y++) {

					const dot = document.createElement('div')
					dot.classList.add('dot')
					div.appendChild(dot)

				}
				sideA.appendChild(div)
			}
			domino.appendChild(sideA)

			const sideB = document.createElement('div')
			sideB.classList.add('side-V')

			for (let x = 0; x < 3; x++) {

				const div = document.createElement('div')
				div.classList.add('side-V-dot')

				for (let y = 0; y < parseInt(guide[j][x]); y++) {

					const dot = document.createElement('div')
					dot.classList.add('dot')
					div.appendChild(dot)
				}
				sideB.appendChild(div)
			}
			domino.appendChild(sideB)

			domino.classList.add('tile')

			domino.dataset.tile = `tile${i}by${j}`
			const newTile = new Tile(domino, domino.dataset.tile, i, j)
			tiles.push(newTile)

		}
	}
	return tiles
}
