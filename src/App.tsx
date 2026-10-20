import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { PageLoader } from '@/components/ui/PageLoader'
import HomePage from '@/pages/HomePage'

// Páginas carregadas sob demanda (cada demonstração vira um arquivo separado no build)
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const PrimeLayout = lazy(() => import('@/demos/prime-imoveis/PrimeLayout'))
const PrimeHome = lazy(() => import('@/demos/prime-imoveis/PrimeHome'))
const PrimeCatalog = lazy(() => import('@/demos/prime-imoveis/PrimeCatalog'))
const PrimeProperty = lazy(() => import('@/demos/prime-imoveis/PrimeProperty'))
// DEMO_ROUTES_IMPORTS

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projetos/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="demos/prime-imoveis" element={<PrimeLayout />}>
            <Route index element={<PrimeHome />} />
            <Route path="imoveis" element={<PrimeCatalog />} />
            <Route path="imovel/:id" element={<PrimeProperty />} />
          </Route>
          {/* DEMO_ROUTES */}
        </Routes>
      </Suspense>
    </>
  )
}
