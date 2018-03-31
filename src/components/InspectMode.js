/* eslint-disable no-undef */
export default class InspectMode extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({mode: 'closed'})

    this.inspectModeEnabled = false

    const template = document.head.querySelector('#inspect-mode-template').import.head.children[0].content.cloneNode(true)

    this.shadow.appendChild(template)

    const activatorSlot = this.shadow.children.activator.assignedNodes()
    let activator = this.shadow.children.activator.children[0]
    if (activatorSlot.length) {
      activator = activatorSlot[0].querySelector('#inspect-mode-activator')
      console.log('[InspectMode] slot active, new activator is:', activator)
    }

    activator.addEventListener('click', () => {
      this.inspectModeEnabled = !this.inspectModeEnabled

      if (this.inspectModeEnabled) {
        insertInspectData(document.body)
        activator.innerText = 'Disable inspect mode'
        return
      }

      removeInspectData(document.body)
      activator.innerText = 'Enable inspect mode'
    })

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
}

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
      insertInspectData(child)
      if (child.shadowRoot) {
        insertInspectData(child.shadowRoot)
      }
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
