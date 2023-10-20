import { AUTH_PATH } from 'constant'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

//          component: 메인 레이아웃          //
export default function Container() {

  //          state: 현재 페이지 path name 상태          //
  const { pathname } = useLocation();

  //          render: 메인 레이아웃 렌더링          //
  return (
    <>
        <Header />
        <Outlet />
        { pathname !== AUTH_PATH && <Footer /> }
    </>
  )
}
