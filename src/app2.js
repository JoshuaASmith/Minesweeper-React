const React = require('react')
const {map, addIndex} = require('ramda')
const mapIndex = addIndex(map)
const minesweeper = require('minesweeper')

const openCss = {
    backgroundColor: 'Red',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderBottomColor: 'black',
    borderRightColor: 'black',
    border: '4px',
    borderStyle: 'solid',
    height: '50px',
    width: '50px'
}

const closedCss = {
    backgroundColor: 'DimGray',
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderBottomColor: 'white',
    borderRightColor: 'white',
    border: '2px',
    borderStyle: 'solid',
    height: '50px',
    width: '50px'
}

const App = React.createClass({
    getInitialState() {
        return {state: 0, grid: [], board: null}
    },
    openCell(x, y) {
        return (e) => {
            let board = this.state.board
            board.openCell(x, y)
            this.setState({grid: board.grid(), state: board.state()})
        }
    },
    componentDidMount() {
        var mineArray = minesweeper.generateMineArray({rows: 10, cols: 10, mines: 15})
        var board = new minesweeper.Board(mineArray)
        this.setState({board: board, grid: board.grid(), state: board.state()})
    },
    render() {
        const determineCellState = (cell) => {
            if (this.state.state < 2) {
                if (cell.state === 0) {
                    return {css: closedCss, text: null}
                } else {
                    return {
                        css: openCss,
                        text: (cell.state === 1 && cell.isMine)
                            ? '🔥'
                            : (cell.numAdjacentMines > 0
                                ? cell.numAdjacentMines
                                : null)
                    }
                }
            } else {
                return {
                    css: openCss,
                    text: cell.isMine
                        ? '🔥'
                        : (cell.numAdjacentMines > 0
                            ? cell.numAdjacentMines
                            : null)
                }
            }
        }
        const td = (cell, i) => {
            const cellState = determineCellState(cell)
            return (
                <td style={cell.state === 0
                    ? closedCss
                    : openCss} key={i} onClick={this.openCell(cell.x, cell.y)}>
                    <center>{cellState.text}</center>
                </td>
            )
        }
        const tr = (row, i) => <tr key={i}>{mapIndex(td, row)}</tr>
        return (
            <div>
                <h1 className="tc">MineSweeper</h1>
                <div className="tc">{this.state.state}</div>
                <table className="center">
                    <tbody>
                        {mapIndex(tr, this.state.grid)}
                    </tbody>
                </table>
            </div>
        )
    }
})

module.exports = App
