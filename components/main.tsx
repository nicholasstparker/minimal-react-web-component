import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MuiModal from './mui-modal/MuiModal'
import SimpleBox from './simple-box/SimpleBox'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
        <MuiModal buttonlabel="Test Button" />
        <SimpleBox text="Test Simple Box" />
    </div>
  </StrictMode>,
)