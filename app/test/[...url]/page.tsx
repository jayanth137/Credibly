import React from 'react'

function page({ params }: { params: any }) {
    const { url } = params
    console.log(url)
    return (
        <div>page</div>
    )
}

export default page