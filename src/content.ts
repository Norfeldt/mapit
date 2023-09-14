let selectedText = window.getSelection()?.toString().trim().replace(/\s+/g, ' ')

if (selectedText) {
  const url = `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(
    selectedText
  )}&key=GOOGLE_MAPS_API_KEY`

  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.width = '600'
  iframe.height = '450'
  iframe.style.position = 'fixed'
  iframe.style.top = '10px'
  iframe.style.right = '10px'
  iframe.style.zIndex = '9999'

  const closeButton = document.createElement('button')
  closeButton.innerText = 'X'
  closeButton.style.display = 'grid'
  closeButton.style.placeItems = 'center'
  closeButton.style.position = 'fixed'
  closeButton.style.top = '0px'
  closeButton.style.right = '0px'
  closeButton.style.zIndex = '10000'
  closeButton.style.height = '35px'
  closeButton.style.background = '#000'
  closeButton.style.color = '#e3e3e3'
  closeButton.style.border = 'none'
  closeButton.style.cursor = 'pointer'
  closeButton.style.padding = '5px 10px'
  closeButton.style.fontSize = '20px'
  closeButton.style.fontWeight = 'bold'
  closeButton.style.borderRadius = '5px'
  closeButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'

  const link = document.createElement('a')
  link.href = 'https://icons8.com'
  link.target = '_blank'
  link.innerText = 'Icons by Icons8'
  link.style.position = 'fixed'
  link.style.bottom = '10px'
  link.style.right = '10px'
  link.style.zIndex = '9999'
  link.style.color = '#e3e3e3'
  link.style.textDecoration = 'none'
  link.style.fontSize = '12px'

  document.body.appendChild(iframe)
  document.body.appendChild(closeButton)
  document.body.appendChild(link)

  closeButton.onclick = () => {
    document.body.removeChild(iframe)
    document.body.removeChild(closeButton)
    document.body.removeChild(link)
  }
}
