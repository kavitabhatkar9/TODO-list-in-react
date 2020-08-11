import React from "react";
import PropTypes from "prop-types";
import "./todo-list.scss";

export default class AddTodoForm extends React.Component {
  static propTypes = {
    addToDo: PropTypes.func,
    maxPriority: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state = {
      priority: "",
      listName: ""
    };
  }
  render() {
    return (
      <div className="form-container">
        <form
          onSubmit={(e) => {
            this.props.addToDo(this.state.priority, this.state.listName);
            e.preventDefault();
            this.setState({ priority: "", listName: "" });
          }}
        >
          <div className="todo-form">
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={this.props.maxPriority}
                      onChange={(e) => {
                        this.setState({
                          priority: e.target.valueAsNumber
                        });
                      }}
                      value={this.state.priority}
                      placeholder="Enter priority"
                    />
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        this.setState({
                          listName: e.target.value
                        });
                      }}
                      value={this.state.listName}
                      placeholder="Not in list? Add one here..."
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary mb-2"
                  type="submit"
                  disabled={
                    this.state.listName === "" || this.state.priority === ""
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
