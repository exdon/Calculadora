import React from 'react'
import './Button.css'

export default props => 
    <button 
        onClick={e => props.click(props.label)}
        className={`
            button
            ${props.operation ? 'operation' : ''} 
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}> {/*Ex. Se props.operation estiver definida, seta class 'operation' se não, seta '' (vazio) */}
        {props.label}
    </button>


/*

// ---- Outra forma de fazer o exemplo acima -----

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button 
            onClick = {e => props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )

}

*/


