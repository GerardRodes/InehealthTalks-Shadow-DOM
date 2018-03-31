import Component from './Component.js'
import '../assets/inspect-mode.css'

function insertInspectData (element) {
  if (!element) {
    return
  }

  if (element.classList) {
    element.classList.add('inspected')
  }

  const inspectData = document.createElement('div')
  const tagName = document.createElement('div')

  inspectData.classList.add('inspect-data')
  tagName.classList.add('tag-name')
  tagName.innerText = `<${element.tagName || element.nodeName} />`

  inspectData.appendChild(tagName)
  element.appendChild(inspectData)

  Array.from(element.children)
    .filter(child => !child.classList.contains('inspect-data'))
    .forEach(child => {
      insertInspectData(child.dataset.isShadow ? child.shadowRoot : child)
    })
}

function removeInspectData (element) {
  element.classList.remove('inspected')

  Array.from(element.children)
    .forEach(child => {
      if (child.classList.contains('inspect-data')) {
        child.remove()
      } else {
        removeInspectData(child)
      }
    })
}

export default class InspectMode extends Component {
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
        innerText: 'Enable inspect mode',
        onclick () {
          this.data.enabled = !this.data.enabled
          this.innerText = (this.data.enabled ? 'Disable' : 'Enabled') + ' inspect mode'

          if (this.data.enabled) {
            insertInspectData(document.body)
          } else {
            removeInspectData(document.body)
          }
        }
      },
      data: {
        enabled: false
      }
    }
  }
}
