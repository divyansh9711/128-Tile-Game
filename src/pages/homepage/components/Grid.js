import Tile from "./Tile"
import '../styles/Grid.css'
import { useState, useEffect } from "react";
import { Label } from "@fluentui/react";

const Grid = ({arrowEvent}) => {
    const tileInfo = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    const [tileValues, setTileValues] = useState(tileInfo)
    const [totalMoves, setTotalMoves] = useState(0)
    const [best,setBest] = useState(0)
    const [score,setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [gameStatus, setGameStatus] = useState('Moves Available')
    const [infoStyle, setInfoStyle] = useState({color:'green',fontWeight:'normal'})
    useEffect(() => {
        if(arrowEvent === 'new'){
            setTileValues(tileInfo)
            setInfoStyle({color:'green',fontWeight:'normal'})
            setTotalMoves(0)
            setGameStatus('Moves Available')
        } 
        if(arrowEvent !== 'reset') performAction(arrowEvent)

    }, [arrowEvent]);

    const addNewValue = (grid) => {
        var iterations = 0
        var findManually = false
        var row = Math.floor(Math.random() * (4));
        var column = Math.floor(Math.random() * (4));
        while (grid[row][column] !== 0) {
            iterations += 1
            row = Math.floor(Math.random() * (4));
            column = Math.floor(Math.random() * (4));
            if (iterations > 100){
                findManually = true
                break
            }
        }

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

    const moveLeft = (grid) => {
        let compressResult = compress(grid)
        let mergeResult = merge(compressResult[0])
        let changed = compressResult[1] || mergeResult[1]

        let finalCompress = compress(mergeResult[0])

        setTileValues(finalCompress[0])
        return [finalCompress[0], changed]

    }

    const moveRight = (grid) => {

        var reversedGrid = reverseTileValues(grid)
        var moveLeftResult = moveLeft(reversedGrid)

        var finalGrid = reverseTileValues(moveLeftResult[0])
        return [finalGrid, moveLeftResult[1]]
    }

    const moveUp = (grid) => {
        var transposedGrid = transposeTileValues(grid)
        var moveLeftResult = moveLeft(transposedGrid)
        var finalGrid = transposeTileValues(moveLeftResult[0])
        return [finalGrid, moveLeftResult[1]]
    }

    const moveDown = (grid) => {
        var transposedGrid = transposeTileValues(grid)
        var moveRightResult = moveRight(transposedGrid)
        var finalGrid = transposeTileValues(moveRightResult[0])
        return [finalGrid, moveRightResult[1]]
    }

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

    const merge = (grid) => {
        var changed = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === grid[i][j + 1] && grid[i][j] !== 0) {
                    grid[i][j] = grid[i][j] * 2
                    grid[i][j + 1] = 0
                    setScore(score + grid[i][j])
                    changed = true
                }
            }
        }
        return [grid, changed]
    }

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

    const getStatus = (grid) => {
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (grid[i][j] === 128){
                    setGameStatus("Congractulations! You won")
                    if (totalMoves < best || best === 0) 
                        setBest(totalMoves - 1)
                    if (score === 0 || score > bestScore)
                        setBestScore(score)
                    return 'WON'
                }
                    
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (grid[i][j] === 0){
                    setInfoStyle({color:'#A08D1A',fontWeight:'normal'})
                    setGameStatus("Empty Tiles Available")
                    return 'GAME NOT OVER'
                }
        setInfoStyle({color:'#A08D1A',fontWeight:'normal'})
        setGameStatus('Empty Tiles not Available, Merge is possible')
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i][j] === grid[i + 1][j] || grid[i][j] === grid[i][j + 1])
                    return 'GAME NOT OVER'

        for (let j = 0; j < 3; j++)
            if (grid[3][j] === grid[3][j + 1])
                return 'GAME NOT OVER'

        for (let i = 0; i < 3; i++)
            if (grid[i][3] === grid[i + 1][3])
                return 'GAME NOT OVER'

        setInfoStyle({color:'Maroon', fontWeight:'bold'})
        setGameStatus('Game Over, Merge Not Possible')
        return 'LOST'
    }

    const performAction = (direction) => {
        if (direction === 'new'){ 
            setTileValues(tileInfo)
            setTotalMoves(0)
            setScore(0)
            return
        }
        let result = [tileValues, true]
        let status = getStatus(tileValues)
        if (status === "WON" || status === "LOST"){
            
            return
        }
        setTotalMoves(totalMoves+1)
        switch (direction) {
            case 'left':
                result = moveLeft(tileValues)
                setTileValues(tileValues)
                break
            case 'right':
                result = moveRight(tileValues)
                setTileValues(tileValues)
                break
            case 'up':
                result = moveUp(tileValues)
                setTileValues(tileValues)
                break
            case 'down':
                result = moveDown(tileValues)
                setTileValues(tileValues)
                break
        }
        setTileValues(result[0])
        status = getStatus(result[0])
        if (status === 'GAME NOT OVER'){
            result[0] = addNewValue(result[0])
        }
    }

    return (
        <div className="game_body">
            <div className="grid">

                <div className="grid_row">
                    <Tile tileValue={tileValues[0][0]} />
                    <Tile tileValue={tileValues[0][1]} />
                    <Tile tileValue={tileValues[0][2]} />
                    <Tile tileValue={tileValues[0][3]} />
                </div>
                <div className="grid_row">
                    <Tile tileValue={tileValues[1][0]} />
                    <Tile tileValue={tileValues[1][1]} />
                    <Tile tileValue={tileValues[1][2]} />
                    <Tile tileValue={tileValues[1][3]} />
                </div>
                <div className="grid_row">
                    <Tile tileValue={tileValues[2][0]} />
                    <Tile tileValue={tileValues[2][1]} />
                    <Tile tileValue={tileValues[2][2]} />
                    <Tile tileValue={tileValues[2][3]} />
                </div>
                <div className="grid_row">
                    <Tile tileValue={tileValues[3][0]} />
                    <Tile tileValue={tileValues[3][1]} />
                    <Tile tileValue={tileValues[3][2]} />
                    <Tile tileValue={tileValues[3][3]} />
                </div>

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
                    <Label>Score: </Label>
                    <span className="info_text">{score} Points</span>
                </div>
                <div className="info_row">
                    <Label>Session Best Score: </Label>
                    <span className="info_text">{bestScore} Points</span>
                </div>
            </div>

        </div>

        
    )
}



export default Grid
