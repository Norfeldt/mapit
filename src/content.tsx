import ReactDOM from 'react-dom/client'
import React from 'react'

const getUrl = () =>
  `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(
    window.getSelection()?.toString().trim().replace(/\s+/g, ' ') ?? ''
  )}&key=GOOGLE_MAPS_API_KEY`

function Content() {
  const [hide, setHide] = React.useState(false)
  const [url, setUrl] = React.useState(getUrl())

  React.useEffect(() => {
    const handleMessage = (message: any) => {
      console.log('message', message)
      if (message.action === 'showContent') {
        setHide(false)
        setUrl(getUrl())
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  const onClose = () => {
    setHide(true)
  }

  if (hide) {
    return null
  }

  return (
    <>
      <iframe
        src={url}
        width="600"
        height="450"
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: '9990',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          zIndex: '10000',
          height: '35px',
          background: '#000',
          color: '#e3e3e3',
          border: 'none',
          cursor: 'pointer',
          padding: '5px 10px',
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        }}>
        X
      </button>
      <a
        href="https://icons8.com"
        target="_blank"
        style={{
          position: 'fixed',
          top: '444px',
          right: '520px',
          zIndex: '9999',
          color: '#333333',
          textDecoration: 'none',
          fontSize: '12px',
        }}>
        Icons by Icons8
      </a>
    </>
  )
}

const id = 'mapit-extension-root'
const existingExtension = document.getElementById(id)
if (!existingExtension) {
  const app = document.createElement('div')
  app.id = id
  document.body.appendChild(app)

  const root = ReactDOM.createRoot(app)
  root.render(<Content />)
}

// At the end of your content.tsx
chrome.runtime.sendMessage({ action: 'contentScriptLoaded' })
