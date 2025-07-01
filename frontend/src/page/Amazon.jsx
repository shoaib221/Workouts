

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHippo, faCartShopping, faDove, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import shop_image1  from '../images/shop_image1.jpg';
import logo  from '../images/Burger.jpg';
import { Link } from 'react-router-dom';
import  '../styles/amazon.css';
import { useState } from 'react';



export const AmazonNav = () => {
    const [ popWindow, setWindow ] = useState(false);

    return (
        <div id='amazon-nav' >

            <div className='flexbox' >
                <FontAwesomeIcon icon={faDove} className='icon' />
            </div>

            <div className='flexbox' >
                <FontAwesomeIcon icon={faLocationDot} className='icon' />
                Deliver To <br/> Bangladesh
            </div>

            <div  id='midbar'>
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

            <div className='flex-column'
            onMouseEnter={ () => setWindow(true) }
            onMouseLeave={ () => setWindow(false) }
            >
                
                
                <div> Sign in or Accounts </div> 
                { popWindow && <div id='sign-in-pop' 
                onMouseEnter={ () => setWindow(true) } 
                onMouseLeave={ () => setWindow(false) } 
                >
                    Hi I am here
                </div> }    

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
        <div className='card' >
            <button 
                style={{ backgroundColor: ' #92002e', color: ' #ffffff', width: "90%" }}
                onClick={() => { props.setid( 'home' ) } } 
            > Back </button>

            { props.data && props.data.map( x => (
                <div id={x.name} > 
                    <button
                        style={{ backgroundColor: 'rgb(213, 205, 205)', width: "90%" }}
                        
                    > { x.name } </button>
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

                    <button 
                        style={{ backgroundColor: ' #92002e', color: ' #ffffff' }}
                        onClick={() => props.toggle() } 
                    > Cancel </button>    

                    <button 
                        style={{ backgroundColor: 'rgb(213, 205, 205)' }}
                        onClick={ () => setID('video') } 
                    > Video </button>

                    <button  
                        style={{ backgroundColor: 'rgb(213, 205, 205)' }}
                        onClick={ () => setID('music') } 
                    > Music </button>

                    <button 
                        style={{ backgroundColor: 'rgb(213, 205, 205)' }}
                        onClick={ () => setID('book') } 
                    > Book </button>

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
            <div className='oplink'  > <Link onClick={ () => props.toggle() } > Home </Link>  </div>
            <div className="oplink"  > <Link to='/product' > Product </Link> </div>
            <div className="oplink"  > <Link to="/orders"> Orders </Link> </div>
            <div className="oplink"  > <Link to="/style"> Style </Link> </div>
        </div>
    )
}


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



export const Dev = () => {

    return (
        <div className='dev' >
            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>
            
            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>

            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>

            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>

            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>

            <div className='dev-child'>
                <h3> Toys </h3>
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
                        Shop 
                    </div>
                    <div className='dev-column' >
                        <img src={logo} className='toy-image' />
                        <div> Shop </div>
                    </div>
                </div>
                <h5> Explore More </h5>
            </div>

        </div>
    )
}


export const SlideBar = () => {


    return(
        <div className='slide-bar' >
            
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            <div> <img src={logo} className='pros' /> </div>
            
            
        </div>
    )
}



const Footer = () => {


    return (
        <div id='footer' >
            <div id='back-to-top' >
                Back to top
            </div>

            <div className='grid' >

                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>

            </div>


            <div className='grid' >
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, 3r 23r3 223r 23r2 3r2r3 </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, r23r r32r23r 3r23r2</div>
            </div>

            <div className='grid' id='last-grid' >
                <div className='grid-child' > Lorem ipsum dolor, 3r32r23  3r 32r 32rr</div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
                <div className='grid-child' > Lorem ipsum dolor, </div>
            </div>

        </div>
    )
}


export const Amazon = () => {
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
            
            { leftslideOn && <LeftSlide toggle={toggleSlide} /> }
            <Footer /> 
            
        </div>
    )
}


