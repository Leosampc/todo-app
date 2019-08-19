import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

import { changeDescription, search, add, clear } from './todoActions'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)

        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search() 
    }

    keyHandler(eventHandler) {
        const { description, search, add, clear } = this.props

        if (eventHandler.key === 'Enter') {
            eventHandler.shiftKey ? search() : add(description)
        } else if (eventHandler.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { description, search, add, clear } = this.props

        return (
            <div role="form" className="todoForm">
                <Grid cols='12 9 10'>
                    <input
                        id="description"
                        className="form-control"
                        placeholder="Adicione uma tarefa"
                        value={this.props.description}
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                    />
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style="primary" icon="plus" onClick={() => add(description)} />
                    <IconButton style="info" icon="search" onClick={search} />
                    <IconButton style="default" icon="close" onClick={clear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    description: state.todo.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeDescription,
    search,
    add,
    clear
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)