import PropTypes from 'prop-types'
import '../styles/Tile.css'
import { useState, useEffect } from "react";

//Component for Individual tiles in the grid
const Tile = ({tileColor, tileValue}) => {
    const [tileStyle , setTileStyle] = useState({backgroundColor: 'white'})
    const color = {0:'white',2:'#FFE1B1',4:'#F9C064',8:'#F1AC3D',16:'#D5FE5D',32:'#9ECA1B',64:'#5BBE13',128:'#12AB00'}
    useEffect(()=>{ 
        setTileStyle({backgroundColor: color[tileValue] || '#FFFFFF'})
    },[tileColor, tileValue]);

    
    return (
        <div className='border' style={tileStyle}>
            <span >{tileValue}</span>
        </div>
    )
}

Tile.defaultProps = {
    tileValue: "",
    tileColor: "#ffffff"
}

Tile.propTypes = {
    tileValue : PropTypes.string.isRequired,
    tileColor : PropTypes.string
}

export default Tile
