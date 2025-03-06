import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Banners from './pages/banners/Banners.tsx'
import { PageDataProvider } from './context/page-data/PageDataProvider.tsx'
import { AuthProvider } from './context/auth/AuthContext.tsx'
import Banner from './pages/banners/Banner.tsx'
import CreateBanner from './pages/banners/CreateBanner.tsx'
import Login from './pages/authentication/Login.tsx'

export default function App() {
    return (
        <CssVarsProvider
            disableTransitionOnChange
            defaultMode={'system'}
        >
            <CssBaseline />
            <AuthProvider>
                <PageDataProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route
                                    path="banners"
                                    element={<Banners />}
                                />
                                <Route
                                    path="/banners/create"
                                    element={<CreateBanner />}
                                />
                                <Route
                                    path="banners/:id"
                                    element={<Banner />}
                                />
                                <Route
                                    path="/login"
                                    element={<Login />}
                                />
                                {/*<Route path="contact" element={<Contact />} />*/}
                                <Route
                                    path="*"
                                    element={<Navigate to={'/banners'} />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PageDataProvider>
            </AuthProvider>
        </CssVarsProvider>
    )
}
