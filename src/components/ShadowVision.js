import Component from './Component.js'
import '../assets/shadow-vision.css'

function insertShadowData (element) {
  element.classList.add('shadow')

  const shadowData = document.createElement('div')
  const tagName = document.createElement('div')

  shadowData.classList.add('shadow-data')
  tagName.classList.add('tag-name')
  tagName.innerText = `<${element.tagName} />`

  shadowData.appendChild(tagName)
  element.appendChild(shadowData)

  Array.from(element.children)
    .filter(child => !child.classList.contains('shadow-data'))
    .forEach(insertShadowData)
}

function removeShadowData (element) {
  element.classList.remove('shadow')

  Array.from(element.children)
    .forEach(child => {
      if (child.classList.contains('shadow-data')) {
        child.remove()
      } else {
        removeShadowData(child)
      }
    })
}

export default class ShadowVision extends Component {
  render () {
    return {
      tag: 'button',
      attributes: {
        innerText: 'Enable shadow vision',
        onclick () {
          this.data.enabled = !this.data.enabled
          this.innerText = (this.data.enabled ? 'Disable' : 'Enabled') + ' shadow vision'

          if (this.data.enabled) {
            insertShadowData(document.body)
          } else {
            removeShadowData(document.body)
          }
        }
      },
      data: {
        enabled: false
      }
    }
  }
}
