fetch('poetry.json')
  .then(response => response.json())
  .then(poems => {
    const list = document.getElementById('poem-list')
    const display = document.getElementById('poem-display')

    poems.forEach(poem => {
      const li = document.createElement('li')
      const btn = document.createElement('button')
      btn.textContent = poem.title
      btn.classList.add('poem-menu-btn')
      btn.addEventListener('click', () => renderPoem(poem, display, list))
      li.appendChild(btn)
      list.appendChild(li)
    })
  })

function renderPoem(poem, display, list) {
  // Transition the page background and text color
  document.body.style.background = poem.background
  document.body.style.color = poem.color

  // Image credit
  const credit = document.getElementById('image-credit')
  credit.textContent = poem.credit || ''

  // Mark active button
  list.querySelectorAll('.poem-menu-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === poem.title)
  })

  // Render poem content
  display.innerHTML = ''
  display.style.fontFamily = poem.font

  const title = document.createElement('h2')
  title.textContent = poem.title
  display.appendChild(title)

  const stanzasWrapper = document.createElement('div')
  stanzasWrapper.classList.add('poem-stanzas')
  if (poem.overlay) stanzasWrapper.classList.add('poem-stanzas--overlay')
  display.appendChild(stanzasWrapper)

  poem.stanzas.forEach(stanza => {
    const stanzaDiv = document.createElement('div')
    stanzaDiv.classList.add('stanza')
    stanza.forEach(line => {
      const lineDiv = document.createElement('div')
      lineDiv.classList.add('line')
      lineDiv.textContent = line
      stanzaDiv.appendChild(lineDiv)
    })
    stanzasWrapper.appendChild(stanzaDiv)
  })
}
