import Tile from "./Tile"
import '../styles/Grid.css'
import { useState, useEffect } from "react";
import { Label } from "@fluentui/react";

//Source to tile algorithm: https://www.geeksforgeeks.org/2048-game-in-python/

const Grid = ({arrowEvent}) => {
    var [tileInfo, setTileInfo] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);
    const [tileValues, setTileValues] = useState(tileInfo)
    const [totalMoves, setTotalMoves] = useState(0)
    const [best,setBest] = useState(0)
    const [score,setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [overAllStatus, setOverAllStatus] = useState(true)
    const [gameStatus, setGameStatus] = useState('Moves Available')
    const [infoStyle, setInfoStyle] = useState({color:'green',fontWeight:'normal'})
    useEffect(() => {
        //Listen for arrow keys and perform action 
        if(arrowEvent !== 'reset') performAction(arrowEvent)
    }, [arrowEvent]);

    /**
         * Returns matrix
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const addNewValue = (grid) => {
        var iterations = 0
        var findManually = false
        var row = Math.floor(Math.random() * (4));
        var column = Math.floor(Math.random() * (4));
        // Iterate over the matrix until an empty spot is found or 100 iterations are complete
        while (grid[row][column] !== 0) {
            iterations += 1
            row = Math.floor(Math.random() * (4));
            column = Math.floor(Math.random() * (4));
            if (iterations > 100){
                findManually = true
                break
            }
        }
        // Empty tile not found in 100 iterations 
        // Enhancement for the case where only 1 tile is remaining
        // Can be further imporved by maintaining a map of available indexes and randomly picking one index
        if (findManually){
            console.log("Finding empty tile iteratively")
            for (let i = 0; i < 4; i++)
                for (let j = 0; j < 4; j++)
                    if (tileValues[i][j] === 0){
                        grid[i][j] = 2
                        return grid
                    }
        }
        grid[row][column] = 2
        return grid
    }

    /**
         * Returns [matrix, boolean, number] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const moveLeft = (grid) => {
        let compressResult = compress(grid)
        let mergeResult = merge(compressResult[0])
        let changed = compressResult[1] || mergeResult[1]

        let finalCompress = compress(mergeResult[0])

        setTileValues(finalCompress[0])
        return [finalCompress[0], changed, mergeResult[2]]

    }

    /**
         * Returns [matrix, boolean, number] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const moveRight = (grid) => {

        var reversedGrid = reverseTileValues(grid)
        var moveLeftResult = moveLeft(reversedGrid)

        var finalGrid = reverseTileValues(moveLeftResult[0])
        return [finalGrid, moveLeftResult[1], moveLeftResult[2]]
    }

    /**
         * Returns [matrix, boolean, number] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const moveUp = (grid) => {
        var transposedGrid = transposeTileValues(grid)
        var moveLeftResult = moveLeft(transposedGrid)
        var finalGrid = transposeTileValues(moveLeftResult[0])
        return [finalGrid, moveLeftResult[1], moveLeftResult[2]]
    }

    /**
         * Returns [matrix, boolean, number] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const moveDown = (grid) => {
        var transposedGrid = transposeTileValues(grid)
        var moveRightResult = moveRight(transposedGrid)
        var finalGrid = transposeTileValues(moveRightResult[0])
        return [finalGrid, moveRightResult[1], moveRightResult[2]]
    }

    /**
         * Returns [matrix, boolean] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const compress = (grid) => {
        var changed = false;
        var tempValues = []
        for (let i = 0; i < 4; i++) {
            tempValues.push([0, 0, 0, 0])
        }

        for (let i = 0; i < 4; i++) {
            var pos = 0;
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] !== 0) {
                    tempValues[i][pos] = grid[i][j]

                    if (j !== pos) {
                        changed = true
                    }
                    pos += 1
                }
            }
        }
        return [tempValues, changed]
    }

    /**
         * Returns [matrix, boolean, number] 
         * 
         * @param {matrix} grid matrix containing tile values
     */
    const merge = (grid) => {
        var changed = false;
        var gap = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === grid[i][j + 1] && grid[i][j] !== 0) {
                    grid[i][j] = grid[i][j] * 2
                    grid[i][j + 1] = 0
                    setScore(score + grid[i][j])
                    gap +=  grid[i][j]
                    changed = true
                }
            }
        }
        return [grid, changed, score + gap]
    }

    /**
         * Returns matrix
         *
         * @param {matrix} grid matrix containing tile values
     */
    const reverseTileValues = (grid) => {
        var tempValues = []
        for (let i = 0; i < 4; i++) {
            tempValues.push([])
            for (let j = 0; j < 4; j++) {
                tempValues[i].push(grid[i][3 - j])
            }
        }
        return tempValues
    }

    /**
         * Returns matrix
         *
         * @param {matrix} grid matrix containing tile values
     */
    const transposeTileValues = (grid) => {
        var tempValues = []
        for (let i = 0; i < 4; i++) {
            tempValues.push([])
            for (let j = 0; j < 4; j++) {
                tempValues[i].push(grid[j][i])
            }
        }
        return tempValues
    }

    /**
         * Returns null.
         *
         * @param {matrix} grid matrix containing tile values
         * @param {number} gap current score
     */
    const getStatus = (grid, gap) => {
        // Check if game is over
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (grid[i][j] === 128){
                    // 128 found game is over
                    setInfoStyle({color:'darkolivegreen',fontWeight:'bold'})
                    setGameStatus("Congractulations! You won")
                    if (totalMoves < best || best === 0) 
                        setBest(totalMoves + 1)
                    if (bestScore === 0 || gap > bestScore)
                        setBestScore(gap)
                        setScore(gap)
                    setOverAllStatus(false)
                    return 
                }
        // Check if some moves are availabe             
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (grid[i][j] === 0){
                    setInfoStyle({color:'#A08D1A',fontWeight:'normal'})
                    setGameStatus("Moves Available")
                    return 
                }
        setInfoStyle({color:'#A08D1A',fontWeight:'normal'})
        setGameStatus('Tile Merge is possible')
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i][j] === grid[i + 1][j] || grid[i][j] === grid[i][j + 1])
                    return 

        for (let j = 0; j < 3; j++)
            if (grid[3][j] === grid[3][j + 1])
                return 

        for (let i = 0; i < 3; i++)
            if (grid[i][3] === grid[i + 1][3])
                return 

       
        setInfoStyle({color:'Maroon', fontWeight:'bold'})
        setGameStatus('Game Over, Merge Not Possible')
        setOverAllStatus(false)
        return
    }

     /**
         * Returns null.
         *
         * @param {string} direction direction of the arrow key pressed
     */
    const performAction = (direction) => {
        if (direction === 'new'){
            // Resetting the board 
            setTileValues(tileInfo)
            setTotalMoves(0)
            setScore(0)
            setOverAllStatus(true)
            return
        }
        // check if game is in active or completed state
        if (!overAllStatus) return
        let result = [tileValues, true]
        let validMove = true
        switch (direction) {
            case 'left':
                result = moveLeft(tileValues)
                break
            case 'right':
                result = moveRight(tileValues)
                break
            case 'up':
                result = moveUp(tileValues)
                break
            case 'down':
                result = moveDown(tileValues)
                break
            default:
                // The move was not valid, hence tiles will not be reset
                validMove = false
        }
        if (validMove){
            // Valid move, setting tiles, incrementing total number of moves
            setTileValues(result[0])
            setTotalMoves(totalMoves+1)
        }
        // Checking game status
        getStatus(result[0], result[2])
        // If game is still active,  add a 2 to a random empty tile
        if (overAllStatus) result[0] = addNewValue(result[0]) 
        return
    }

    return (
        <div className="game_body">
            <div className="grid">
                
                {tileValues.map(row => 
                    <div className="grid_row">
                        {row.map(tile => 
                            <Tile tileValue={tile}></Tile>
                        )}
                    </div>
                    )
                }
            </div>
            <div className="game_summary">
                <div className="info_row">
                    <Label>Status: </Label>
                    <span style={infoStyle} className="info_text">{gameStatus}</span>
                </div>
                <div className="info_row">
                    <Label>Win with Minimum number of moves: </Label>
                    <span className="info_text">{best} Moves</span>
                </div>
                <div className="info_row">
                    <Label>Total Moves: </Label>
                    <span className="info_text">{totalMoves} Moves</span>
                </div>
                <div className="info_row">
                    <Label>Score to 128: </Label>
                    <span className="info_text">{score} Points</span>
                </div>
                <div className="info_row">
                    <Label>Session Best Score: </Label>
                    <span className="info_text">{bestScore} Points</span>
                </div>
                <div className="info_row">
                    <Label>How to play: </Label>
                    <span className="info_text"> Use arrow keys, refer to these </span>
                    <a href="https://levelskip.com/puzzle/How-to-play-2048" target="_blank" className="info_text">rules</a>
                    
                </div>
                <div className="info_row">
                    <Label>Link to algorithm: </Label>
                    <a href="https://www.geeksforgeeks.org/2048-game-in-python/" target="_blank" className="info_text">Game implementation in Python</a>
                </div>
                <div className="info_row">
                    <Label>Link to source code: </Label>
                    <a href="https://github.com/divyansh9711/128-Tile-Game" target="_blank" className="info_text">Github</a>
                </div>
                
            </div>

        </div>

        
    )
}



export default Grid
