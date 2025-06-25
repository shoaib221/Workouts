

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHippo, faCartShopping, faDove, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import shop_image1  from '../constants/shop_image1.jpg';
import logo  from '../constants/Burger.jpg';
import { Link } from 'react-router-dom';

import { useState } from 'react';


export const SlideProduct = () => {
    const ids=[ "img1", "img2", "img3", "img4" ];
    const [ index, setIndex ] = useState(0);

    const leftSlide = () => {
        if( index>0 ) setIndex(index-1);
        else setIndex( ids.length-1 );
    }

    const rightSlide = () => {
        if( index < ids.length-1 ) setIndex( index+1 );
        else setIndex(0);
    }

    return (
        <div className="slide-product" >
            <div id={ ids[index] } ></div>

            <button onClick={leftSlide} id="left-button" > &#8592; </button>
            <button onClick={rightSlide} id="right-button" > &#8594; </button>

        </div>
    )
}



export const AmazonNav = () => {


    return (
        <div id='amazon-nav' >

            <div className='flexbox' >
                <FontAwesomeIcon icon={faDove} className='icon' />
            </div>

            <div className='flexbox' >
                <FontAwesomeIcon icon={faLocationDot} className='icon' />
                Deliver To <br/> Bangladesh
            </div>

            <div className='flexbox' id='midbar'>
                <select >
                    <option value="" > All </option>
                    <option value="art" > Arts </option>
                    <option value="film"> Film </option>
                    <option value="Sport"> Sports </option>

                </select>
                <input placeholder='search me'></input>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
            </div>

            <div className='flexbox' >
                <select >
                    <option value="english" > EN </option>
                    <option value="art" > Arts </option>
                    <option value="film"> Film </option>
                    <option value="Sport"> Sports </option>

                </select>
            </div>

            <div className='flexbox'>
                Hello, Sign in
                Accounts & Lists
            </div>

            <div className='flexbox' >
                <FontAwesomeIcon icon={faCartShopping} className='icon' />
                Cart
            </div>

            
        </div>
    )
}


const Card = (props) => {


    return (
        <div>
            <button onClick={() => { props.setid( 'home' ) } } > Back </button>

            { props.data && props.data.map( x => (
                <div id={x.name} > 
                    <button> { x.name } </button>
                </div>
            ))}
        </div>
    )
}

const LeftSlide = (props) => {
    const [ currentID, setID ] = useState('home');

    const data = {
        video: [
            { name: 'video1', link: 'https://www.youtube.com' },
            { name: 'video2', link: 'https://www.youtube.com' },
            { name: 'video3', link: 'https://www.youtube.com' },
        ],
        music: [
            { name: 'music1', link: 'https://www.youtube.com' },
            { name: 'music2', link: 'https://www.youtube.com' },
            { name: 'music3', link: 'https://www.youtube.com' },
        ],
        book: [
            { name: 'book1', link: 'https://www.youtube.com' },
            { name: 'book2', link: 'https://www.youtube.com' },
            { name: 'book3', link: 'https://www.youtube.com' },
        ]
    }

    return (
        <div id='left-slide' >
            
            <div id='window' >

                { currentID==='home' &&  <div id='home' >

                    <button onClick={() => props.toggle() } > X </button>    
                    <button onClick={ () => setID('video') } >
                        Video 
                    </button>
                    <button  onClick={ () => setID('music') } > Music </button>
                    <button onClick={ () => setID('book') } > Book </button>

                </div>  }
                

                { currentID==='video' && <Card data={ data.video } title='Video' setid={setID} /> }
                { currentID==='music' && <Card data={ data.music } title='Music' setid={setID} /> }
                { currentID==='book' && <Card data={ data.book } title='Book' setid={setID} /> }    
                
            </div> 
            
            

        </div>
    )
}

export const OptionBar = (props) => {

    return (
        <div  id="optionbar" >                
            <div className="cendiv" > <button onClick={ () => props.toggle() } > Home </button>  </div>
            <div className="cendiv" > <Link className="oplink" to='/product' > Product </Link> </div>
            <div className="cendiv" > <Link className="oplink" to="/orders"> Orders </Link> </div>
            <div className="cendiv" > <Link className="oplink" to="/style"> Style </Link> </div>
        </div>
    )
}


export const SlideBar = () => {

    const pros  = (
        <div className='pros' >

        </div>
    )

    return(
        <div className='slide-bar' >
            
            
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            <img src={logo} className='pros' />
            
        </div>
    )
}


export const Dev = () => {

    return (
        <div className='dev' >
            <div className='dev-child'>
                <h1> Toys </h1>
                <div className='dev-row'>
                    <div className='dev-column' >
                        
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>

                <div className='dev-row' >
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h3> Explore More </h3>
            </div>
            <div className='dev-child'>2</div>
            <div className='dev-child'>3</div>
            <div className='dev-child'>4</div>
            <div className='dev-child'>5</div>
            <div className='dev-child'>6</div>
        </div>
    )
}



export const Style = () => {
    const [ leftslideOn, setLeftSlide ] = useState(false);
    const toggleSlide = () => {
        if(leftslideOn) setLeftSlide(false);
        else setLeftSlide(true);
    }

    return (
        <div className="style">
            
            <AmazonNav />
            <OptionBar toggle={toggleSlide} />
            <SlideProduct />
            <Dev />
            <SlideBar />
            <Dev />
            <SlideBar />
            { leftslideOn && <LeftSlide toggle={toggleSlide} /> }
            
        </div>
    )
}


export const FlexBoxes = () => {


    return (
        <div className="major" >
            <div className="major-child" > <FontAwesomeIcon icon={faHippo} /> </div>
            <div className="major-child" > <FontAwesomeIcon icon={faEnvelope} /> </div>
            <div className="major-child" > <FontAwesomeIcon icon={faCartShopping} /> </div>
            <div className="major-child" >4</div>
            <div className="major-child" >5</div>
            <div className="major-child" >6</div>
            <div className="major-child" >7</div>
            <div className="major-child" >8</div>
        </div>

    )
}