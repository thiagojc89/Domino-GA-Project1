//Tile Class
class tile {
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