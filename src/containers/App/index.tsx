import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Header, MainSection } from '../../components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: TodoItemData[];
    actions: typeof TodoActions;
  }

  export interface State {
    todos: Array<TodoItemData>;
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }


  componentDidMount() {
    fetch("http://localhost:8000/")
    .then(function(response) { return response.json(); })
    .then((response: any) => {
      const todos = response;
      this.props.actions.init(todos);
      //this.setState({todos})
    })
  }

  render() {
    const {todos, actions, children } = this.props;
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions as any, dispatch),
  };
}
