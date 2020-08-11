import React from "react";
import PropTypes from "prop-types";
import { find } from "lodash";
import "../todo-list.scss";

export default class TodoLists extends React.Component {
  static propTypes = {
    todoList: PropTypes.array,
    updateToDoItem: PropTypes.func,
    deleteTodo: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      priority: null,
      listName: ""
    };
  }
  componentDidMount() {
    document.getElementById(this.props.todoList[0].id.toString()).focus();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.todoList.length !== this.props.todoList.length) {
      const match = find(this.props.todoList, { active: true });
      document
        .getElementById(
          match ? match.id.toString() : this.props.todoList[0].id.toString()
        )
        .focus();
    }
  }
  deactivatePrevItem = (currentnodeId) => {
    this.props.todoList.forEach(item => {
      if (item.id !== currentnodeId) {
        this.props.updateToDoItem({
          active: false,
          id: item.id
        });
      }
    });
  };
  makePrevItemReadonly = () => {
    const match = find(this.props.todoList, {
      isEditing: true
    });
    const idx = this.props.todoList.indexOf(match);
    if (idx !== -1) {
      this.props.updateToDoItem({
        isEditing: false,
        id: this.props.todoList[idx].id
      });
    }
  };
  handleArrowClick = (todoItemId, match, arrowType) => {
    if (
      todoItemId !==
      this.props.todoList[
        arrowType === "NEXT" ? this.props.todoList.length - 1 : 0
      ].id
    ) {
      // if not on last/first item
      this.props.updateToDoItem({
        active: false,
        id: todoItemId
      });
      const idx = this.props.todoList.indexOf(match);
      // update next item
      this.props.updateToDoItem({
        active: true,
        id: this.props.todoList[arrowType === "NEXT" ? idx + 1 : idx - 1].id
      });
      document
        .getElementById(
          (arrowType === "NEXT" ? match.id + 1 : match.id - 1).toString()
        )
        .focus();
    }
  };
  handleArrowKeys = (e) => {
    const todoItemId = e.target?.getAttribute("id")
      ? Number(e.target.getAttribute("id"))
      : null;
    if (todoItemId) {
      const match = find(this.props.todoList, {
        id: todoItemId
      });
      if (e.which === 39 && !match.isEditing) {
        //next arrow clicked
        this.handleArrowClick(todoItemId, match, "NEXT");
      } else if (e.which === 37 && !match.isEditing) {
        // previous arrow clicked
        this.handleArrowClick(todoItemId, match, "BACK");
      }
    }
  };
  render() {
    return (
      <div
        onKeyDown={(e) => {
          this.handleArrowKeys(e);
        }}
      >
        {this.props.todoList.map((todoItem) => (
          <div
            className={
              todoItem.active ? "item item-active checkbox" : "item checkbox"
            }
          >
            <input
              type="checkbox"
              value=""
              className="checkbox-2x"
              checked={todoItem.active}
              onChange={() => {
                this.props.updateToDoItem({
                  active: !todoItem.active,
                  id: todoItem.id
                });
              }}
            />
            <div className="item-container">
              <div
                tabIndex="0"
                className={`item-detail list-div-${todoItem.id}`}
                id={todoItem.id}
                key={todoItem.id}
                onDoubleClick={(e) => {
                  if (todoItem.isEditing) return false;
                  this.setState({
                    priority: todoItem.priority,
                    listName: todoItem.name
                  });
                  this.deactivatePrevItem(todoItem.id);
                  this.props.updateToDoItem({
                    isEditing: true,
                    active: true,
                    id: todoItem.id
                  });
                  document.getElementById(todoItem.id.toString()).focus();
                }}
                onKeyUp={(e) => {
                  if (e.which === 46 && !todoItem.isEditing) {
                    // keyboard delete key pressed
                    this.props.deleteTodo(todoItem.id);
                  }
                }}
                onClick={(e) => {
                  if (
                    e.target.className.indexOf(`list-div-${todoItem.id}`) === -1
                  ) {
                  }
                  !todoItem.isEditing && this.makePrevItemReadonly();
                  this.deactivatePrevItem(todoItem.id);
                  !todoItem.isEditing &&
                    this.props.updateToDoItem({
                      active: true,
                      id: todoItem.id
                    });
                  !todoItem.isEditing &&
                    document.getElementById(todoItem.id.toString()).focus();
                }}
              >
                {todoItem.isEditing ? (
                  <span>
                    <input
                      type="number"
                      min={1}
                      max={this.props.todoList.length}
                      value={this.state.priority}
                      onChange={(e) => {
                        this.setState({
                          priority: e.target.valueAsNumber
                        });
                      }}
                    />
                  </span>
                ) : (
                    <span>{todoItem.priority}</span>
                  )}
                {!todoItem.isEditing ? (
                  <span className="item-name">{todoItem.name}</span>
                ) : (
                    <span>
                      <input
                        type="text"
                        value={this.state.listName}
                        onChange={(e) => {
                          this.setState({
                            listName: e.target.value
                          });
                        }}
                      />
                    </span>
                  )}
              </div>
              {todoItem.isEditing ? (
                <span>
                  <button
                    style={{ border: "none" }}
                    onClick={() => {
                      this.props.updateToDoItem({
                        id: todoItem.id,
                        priority: this.state.priority,
                        name: this.state.listName,
                        isEditing: !todoItem.isEditing
                      });
                      document.getElementById(todoItem.id.toString()).focus();
                    }}
                  >
                    <i
                      style={{
                        fontSize: "15px",
                        color: "#2196F3"
                      }}
                      className="fa fa-check"
                    ></i>
                  </button>
                </span>
              ) : (
                  <div className="list-action">
                    <button
                      style={{ border: "none" }}
                      onClick={() => {
                        this.props.deleteTodo(todoItem.id);
                      }}
                    >
                      <i
                        style={{ fontSize: "15px", color: "red" }}
                        className="fa fa-times"
                      ></i>
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
