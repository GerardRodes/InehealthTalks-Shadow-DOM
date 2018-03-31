import InspectMode from './components/InspectMode.js'

window.var = 'Hi from the world'
window.editTest = 'Hi, don\'t kill me please'

window.customElements.define('inspect-mode', InspectMode)

window.shadowEditTest = 'Purified!!'
console.log('%c[global scope] window.shadowVar: %c' + window.shadowVar, 'color: CornflowerBlue; font-weight: bold; font-size: 1rem;', 'color: purple; font-weight: bold; font-size: 1rem;')
console.log('%c[global scope] window.shadowEditTest: ' + window.shadowEditTest, 'color: CornflowerBlue; font-weight: bold; font-size: 1rem;')
