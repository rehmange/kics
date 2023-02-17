import React, { useState } from 'react';

const Image = ({item,index,deleteHandle }) => {
    const [show, setShow] = useState(true);
    const [showText, setShowText] = useState(false);
    function handleMouseOver() {
        setShowText(true);
      }
    
      function handleMouseLeave() {
        setShowText(false);
      }
    return (
        <>
            <div  className="imageWrapper">
                <img src={item} className="imgSize" style={showText?{opacity:"0.5",cursor: 'pointer'}:null}  alt='jd'
                //  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                 onMouseEnter={handleMouseOver}
                  />
                <div className='deleteicon' >

                    {showText ? 
                    <><div onMouseEnter={handleMouseOver}>
                        <i className="fa-solid fa-eye icons" onClick={()=>{<><img src={item}   alt='jd'/></>}}></i>
                    </div>
                        <div onMouseEnter={handleMouseOver}>
                                <i className="fa-solid fa-trash icons"
         onClick={() => { deleteHandle(item, index) }}
        ></i>
                        </div></>
                         : null} 
                </div>
            </div>
        </>
    )
}

export default Image