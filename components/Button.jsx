import React from 'react'

function Button({ name, onclick, color }) {
    return (
        <button className={`px-4 py-2  text-white rounded-lg flex ${color} md:text-sm text-xs `} onClick={onclick}>
            {name}
        </button>
    )
}

export default Button