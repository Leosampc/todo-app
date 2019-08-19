import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
      super(props)
        this.state = { description: '', todoList: [] }

        this.handleSearch        = this.handleSearch.bind(this)
        this.handleClear         = this.handleClear.bind(this)
        this.handleChange        = this.handleChange.bind(this)
        this.handleRemove        = this.handleRemove.bind(this)

        this.refresh()
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(response => this.refresh(this.state.description))
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(response => this.setState({ ...this.state, description, todoList: response.data }))
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm 
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    handleClear={this.handleClear}
                    description={this.state.description} 
                />
                <TodoList 
                    handleRemove={this.handleRemove}
                />
            </div>

        )
    }
}