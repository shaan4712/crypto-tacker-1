import React, { useState } from 'react'
import './styles.css'

const CoinInfo = ( {heading, desc} ) => {
    const shortDesc = desc.slice(0, 250) + "<p style='color: var(--grey)'> Read More... </p> ";
    const longDesc = desc + "<p style='color: var(--grey)'> Read Less... </p> ";

    const [flag, setFlag] = useState(true);

  return (
    <div className='grey-wrapper'>
        <h3 className='coin-info-heading'> {heading} </h3>
        {desc.length > 250 ? (
            <p onClick={() => setFlag(!flag)}
            className='coin-info-desc' 
            dangerouslySetInnerHTML={{__html: flag ? shortDesc : longDesc}} />
        )
        : 
        (
            <p dangerouslySetInnerHTML={{__html: desc}} />
        )
        }
        
    </div>
  )
}

export default CoinInfo