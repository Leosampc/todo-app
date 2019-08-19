import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { markAsDone, markAsPending, remove } from './todoActions'

import IconButton from '../template/iconButton'

const TodoList = props => {
    const renderTableRows = () => {
        const todoList = props.todoList || []

        return todoList.map(todo => (
            <tr key={todo._id} >
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' onClick={() => props.markAsDone(todo)} hide={todo.done} />
                    <IconButton style='warning' icon='undo' onClick={() => props.markAsPending(todo)} hide={!todo.done} />
                    <IconButton style='danger' icon='trash-o' onClick={() => props.remove(todo)} hide={!todo.done} />
                </td>
            </tr>
        ))
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderTableRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    todoList: state.todo.todoList  
})

const mapDispatchToPros = dispatch => bindActionCreators({ 
    markAsDone, 
    markAsPending,
    remove
}, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(TodoList)