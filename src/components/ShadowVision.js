import Component from './Component.js'
import '../assets/shadow-vision.css'

function insertShadowData (element) {
  if (!element) {
    return
  }

  if (element.classList) {
    element.classList.add('shadow')
  }

  const shadowData = document.createElement('div')
  const tagName = document.createElement('div')

  shadowData.classList.add('shadow-data')
  tagName.classList.add('tag-name')
  tagName.innerText = `<${element.tagName || element.nodeName} />`

  shadowData.appendChild(tagName)
  element.appendChild(shadowData)

  Array.from(element.children)
    .filter(child => !child.classList.contains('shadow-data'))
    .forEach(child => {
      insertShadowData(child.dataset.isShadow ? child.shadowRoot : child)
    })
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
  constructor () {
    super()

    const style = document.createElement('style')
    style.textContent = `
      button {
        background-color: red;
      }

      body {
        background-color: black;
      }
    `

    // this.shadow.appendChild(style)

    const script = document.createElement('script')
    script.textContent = `
      console.log('%c[shadow scope] window.var: %c' + window.var, 'color: purple; font-weight: bold; font-size: 1rem;', 'color: CornflowerBlue; font-weight: bold; font-size: 1rem;')
      window.shadowVar = 'Hi from the shadows'

      window.editTest = 'Corrupted by shadows!!'
      console.log('%c[shadow scope] window.editTest: ' + window.editTest, 'color: purple; font-weight: bold; font-size: 1rem;')

      window.shadowEditTest = 'I come from shadows'
    `

    this.shadow.appendChild(script)
  }

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
