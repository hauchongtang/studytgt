import React from 'react'
import Layout from '../../components/Layout'

function DashboardView() {
  return (
    <Layout>
      <div className="absolute top-16 w-full md:left-60 md:top-16 md:w-[calc(100vw_-_15rem)]">
        <div className="grid grid-cols-3 gap-3">
          <div className="relative">1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardView