const React = require('react')
const minesweeper = require('minesweeper')
const {map, addIndex} = require('ramda')

const mapIndex = addIndex(map)
const closedCss = {
    border: '4px',
    borderStyle: 'solid',
    backgroundColor: 'DimGray',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    height: '40px',
    minWidth: '40px'
}
const openCss = {
    border: '4px',
    borderStyle: 'solid',
    backgroundColor: 'DimGray',
    borderLeftColor: 'black',
    borderTopColor: 'black',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    height: '40px',
    minWidth: '40px'
}

module.exports = React.createClass({
    getInitialState() {
        return {grid: [], state: 0, board: null}
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
                            ? '💩'
                            : null
                    }
                }
            } else {
                return {
                    css: openCss,
                    text: cell.isMine
                        ? '💩'
                        : null
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
                <h1>MineSweeper</h1>
                <div>{this.state.state}</div>
                <table>
                    <tbody>
                        {mapIndex(tr, this.state.grid)}
                    </tbody>
                </table>
            </div>
        )
    }
})
