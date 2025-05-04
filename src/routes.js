import { lazy } from 'react'

// Lazy load your main components for better performance
const Desktop = lazy(() => import('./components/desktop/Desktop'))
const KhuaApp = lazy(() => import('./components/apps/Khua/Khua'))
const AboutApp = lazy(() => import('./components/apps/About/About'))
const PixelArtApp = lazy(() => import('./components/apps/PixelArt/PixelArt'))
const ContactApp = lazy(() => import('./components/apps/Contact/Contact'))
const ShutdownScreen = lazy(() => import('./components/apps/Shutdown/Shutdown'))

const routes = [
  {
    path: '/',
    element: <Desktop />,
    children: [
      {
        path: 'khua',
        element: <KhuaApp />
      },
      {
        path: 'about',
        element: <AboutApp />
      },
      {
        path: 'contact',
        element: <ContactApp />
      },
      {
        path: 'pixelart',	
        element: <PixelArtApp />
      },
      {
        path: 'shutdown',
        element: <ShutdownScreen />
      }
    ]
  }
]

export default routes