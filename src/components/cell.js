var React = require('react')
var minesweeper = require('minesweeper')
var pin = require('linchpin')

var CellStateEnum = minesweeper.CellStateEnum
var CellFlagEnum = minesweeper.CellFlagEnum

var cellState = function(cell) {
    if (cell.state === CellStateEnum.CLOSED) {
        if (cell.flag === CellFlagEnum.NONE) {
            strRow += getCellString(' ');
        } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
            strRow += getCellString('!');
        } else if (cell.flag === CellFlagEnum.QUESTION) {
            strRow += getCellString('?');
        }
    } else if (cell.state === CellStateEnum.OPEN) {
        if (cell.isMine) {
            strRow += getCellString('*');
        } else {
            strRow += getCellString(cell.numAdjacentMines);
        }
    }
}

const CellComponent = React.createClass({
    handleClick() {
        var cell = this.props.cell
        var board = this.props.board
        board.openCell(cell.x, cell.y)
        pin.emit('repaint')
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                {cellState(this.props.cell)}
            </div>
        )
    }
})

module.exports = CellComponent
