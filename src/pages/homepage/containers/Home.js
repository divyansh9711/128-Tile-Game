import Footer from "../components/Footer"
import Grid from "../components/Grid"
import Header from "../components/Header"
import '../styles/Home.css'
import ArrowKeysReact from 'arrow-keys-react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';

import { useState, useEffect } from "react";


const Home = () => {
    const [key, setKey] = useState(null)
    const [warning, setWarning] = useState('')
    useEffect(()=>{
        //setTileValues(tileInfo)
       configureArrows()
    },[]);

    const configureArrows = () =>{
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                    setKey('left');
                    setKey('reset')
                    setWarning('')
                    break;
                case 38:
                   setKey('up');
                   setKey('reset')
                   setWarning('')
                    break;
                case 39:
                    setKey('right');
                    setKey('reset')
                    setWarning('')
                    break;
                case 40:
                    setKey('down');
                    setKey('reset');
                    setWarning('')
                    break;
                default:
                    setWarning('Invalid Key Input')
            }
        });
        
    }

    const resetGame = () => {
        setKey('new')
    }
    
    return (
        <div>
            <div className="main_content">
                <Header/>
                <div className = "game_controller">
                    <PrimaryButton text="Reset Game" onClick={resetGame}></PrimaryButton> 
                </div>
                <Grid arrowEvent = {key}/>
                <div className="warning_label">
                    <span>{warning}</span>
                </div>
                
                
            </div>
            <Footer/>
        </div>
        
    )
}

export default Home
