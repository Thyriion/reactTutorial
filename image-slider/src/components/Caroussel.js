import React, { useEffect, useState } from 'react';
import './style/Caroussel.css';

function Caroussel({images}) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    useEffect(() => {
        timeOut = autoPlay && setTimeout(() => {
            slideRight();
        }, 2500);
    });  

    const slideRight = () => {
        if (current === images.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
    };

    const slideLeft = () => {
        if (current <= 0) {
            setCurrent(images.length - 1);
        } else {
            setCurrent(current - 1);
        }
    };
  return (
    <div 
        className='caroussel' 
        onMouseEnter={() => {
            setAutoPlay(false);
            clearTimeout(timeOut);
        }} 
        onMouseLeave={() => {
            setAutoPlay(true);
        }}
    >
        <div className="caroussel_wrapper">
        {
            images.map((image, index) => {
                return(
                    <div 
                        key={index} 
                        className={
                            index === current ? 
                            "caroussel_card caroussel_card-active" : 
                            "caroussel_card"
                        }
                    >
                        <img className="card_image" src={image.image} alt=""/>
                        <div className='card_overlay'>
                            <h2 className='card_title'>{image.title}</h2>
                        </div>
                    </div>
                );
            })
        }
            <div className='caroussel_arrow_left' onClick={slideLeft}>&lsaquo;</div>
            <div className='caroussel_arrow_right' onClick={slideRight}>&rsaquo;</div>
            <div className="caroussel_pagination">
                {images.map((_, index) => {
                    return (
                        <div 
                            key={index}
                            className={
                                index === current ? 
                                "pagination_dot pagination_dot-active" : 
                                "pagination_dot"
                            }
                            onClick={() => setCurrent(index)}
                        >

                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Caroussel