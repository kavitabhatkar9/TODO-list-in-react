import React from "react";
import Header from "./header/Header";
import TodoLists from "./lists/TodoLists";
import { find } from "lodash";
import AddTodoForm from "./AddTodoForm";
import "./todo-list.scss";

const pizzaSteps = [
  {
    name: "Knead the Dough",
    priority: 1,
    id: 1,
    active: true,
    isEditing: false,
  },
  {
    name: "Cover the Dough in Plastic Wrap",
    priority: 2,
    id: 2,
    active: false,
    isEditing: false,
  },
  {
    name: "Check to See If the Dough Is Done",
    priority: 3,
    id: 3,
    active: false,
    isEditing: false,
  },
  {
    name: "Divide the Dough",
    priority: 4,
    id: 4,
    active: false,
    isEditing: false,
  },
  {
    name: "Shape the Dough",
    priority: 5,
    id: 5,
    active: false,
    isEditing: false,
  },
  {
    name: "Top the Pizza and Bake",
    priority: 6,
    id: 6,
    active: false,
    isEditing: false,
  }
];
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: pizzaSteps
    };
  }
  updatePriorities = (obj, match, lists) => {
    if (obj.priority === match.priority) {
      for (let i = lists.indexOf(match); i < lists.length; i++) {
        let item = lists[i];
        item.priority = item.priority + 1;
        item.id = item.priority;
      }
    } else if (match.priority > obj.priority) {
      const item = find(lists, { priority: obj.priority });
      for (let i = lists.indexOf(item); i < lists.indexOf(match); i++) {
        let item = lists[i];
        item.priority = item.priority + 1;
        item.id = item.priority;
      }
    } else {
      const item = find(lists, { priority: obj.priority });
      for (let i = lists.indexOf(item); i > lists.indexOf(match); i--) {
        let item = lists[i];
        item.priority = item.priority - 1;
        item.id = item.priority;
      }
    }
    this.setState({
      todoLists: lists
    });
  };
  updateToDoItem = (obj) => {
    if (obj.id) {
      let lists = [...this.state.todoLists];
      let match = find(lists, { id: obj.id });
      if (match) {
        obj.priority && this.updatePriorities(obj, match, lists);
        match.isEditing = obj.hasOwnProperty("isEditing")
          ? obj.isEditing
          : match.isEditing;
        match.priority = obj.hasOwnProperty("priority")
          ? obj.priority
          : match.priority;
        match.id = obj.hasOwnProperty("priority") ? obj.priority : match.id;
        match.name = obj.hasOwnProperty("name") ? obj.name : match.name;
        match.active = obj.hasOwnProperty("active") ? obj.active : match.active;
      }
      lists.sort((a, b) => {
        return a.priority - b.priority;
      });
      this.setState({
        todoLists: lists
      });
    }
  };
  addTodoItem(priority, listName) {
    const listItem = {
      id: priority,
      name: listName,
      active: false,
      isEditing: false,
      priority: priority
    };
    let lists = [...this.state.todoLists];
    let match = find(lists, { id: priority });
    if (match) {
      priority && this.updatePriorities(listItem, match, lists);
      lists.splice(priority - 1, 0, listItem);
    } else {
      lists.push(listItem);
    }
    lists.sort((a, b) => {
      return a.priority - b.priority;
    });
    this.setState({
      todoLists: lists
    });
  }
  deleteTodoItem(id) {
    let lists = [...this.state.todoLists];
    let match = find(lists, { id: id });
    if (match) {
      for (let i = lists.indexOf(match); i < lists.length; i++) {
        let item = lists[i];
        item.priority = item.priority - 1;
        item.id = item.priority;
      }
      lists.splice(lists.indexOf(match), 1);
      lists.sort((a, b) => {
        return a.priority - b.priority;
      });
      this.setState({
        todoLists: lists
      });
    }
  }
  deleteSelectedTodos() {
    let lists = [...this.state.todoLists];
    let match = find(lists, { active: true });
    while (match) {
      for (let i = lists.indexOf(match); i < lists.length; i++) {
        let item = lists[i];
        item.priority = item.priority - 1;
        item.id = item.priority;
      }
      lists.splice(lists.indexOf(match), 1);
      match = find(lists, { active: true });
    }
    lists.sort((a, b) => {
      return a.priority - b.priority;
    });
    this.setState({
      todoLists: lists
    });
  }
  render() {
    return (
      <div>
        <div className="to-do-list-container">
          <Header />
          {this.state.todoLists.length > 0 ? (
            <div>
              <div className="form-wrapper">
                <AddTodoForm
                  maxPriority={this.state.todoLists.length + 1}
                  addToDo={this.addTodoItem.bind(this)}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    this.deleteSelectedTodos();
                  }}
                  disabled={
                    find(this.state.todoLists, { active: true }) ? false : true
                  }
                >
                  Delete Selected
                </button>
              </div>
              <TodoLists
                todoList={this.state.todoLists}
                updateToDoItem={this.updateToDoItem}
                deleteTodo={this.deleteTodoItem.bind(this)}
              />
            </div>
          ) : (
              <div className="empty-list">
                <div className="empty-list-text">Add your first todo...</div>
                <AddTodoForm
                  maxPriority={this.state.todoLists.length + 1}
                  addToDo={this.addTodoItem.bind(this)}
                />
              </div>
            )}
        </div>
      </div>
    );
  }
}
