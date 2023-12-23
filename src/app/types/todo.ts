export type TodoItem = {
  id: string
  text: string
  done: boolean
}

export type TodoList = {
  todoListId: number
  todoList: TodoItem[]
}

export type TodoTab = {
  id: number
  name: string
  editMode: boolean
  isActive: boolean
}

