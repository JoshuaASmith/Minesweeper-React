const React = require('react')
const RowComponent = require('./row')

module.exports = function(props) {
    return <div className="container">{props.board.grid().map(row => <RowComponent row={row} board={props.board}/>)}</div>
}
