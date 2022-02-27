// == Import
import * as React from 'react';
import * as _ from 'lodash';
import './styles.scss';
import dataTask from 'src/data/tasks';
import FormInput from 'src/components/FormInput';
import Counter from 'src/components/Counter';
import Content from 'src/components/Content';

type MyProps = {};
type MyState = {
  tasks: { id: number; label: string; done: boolean }[];
  newTask: string;
};

// == Composant
export default class App extends React.Component<MyProps, MyState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      tasks: dataTask,
      newTask: '',
    };
  }

  setNewTask = (newTask: string) => {
    this.setState({
      newTask,
    });
  };

  addNewTask = (newTask: string) => {
    const { tasks } = this.state;
    const { id } = _.maxBy(tasks, 'id');
    this.setState({
      tasks: [...tasks, { id: id + 1, label: newTask, done: false }],
      newTask: '',
    });
  };

  onTodoClick = (editedTask: MyState['tasks'][1]) => {
    const { tasks } = this.state;
    this.setState({
      tasks: [
        ...tasks.filter((task) => task.id !== editedTask.id),
        { id: editedTask.id, label: editedTask.label, done: !editedTask.done },
      ],
    });
  };

  getNotDoneTasks = () => {
    const { tasks } = this.state;

    const notDoneTasks = tasks.filter((task) => task.done === false);
    return notDoneTasks.length;
  };

  getOrderedTodos = () => {
    const { tasks } = this.state;
    const notDoneTasks = tasks.filter((task) => task.done === false);
    const doneTask = tasks.filter((task) => task.done === true);
    return [...notDoneTasks, ...doneTask];
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { newTask } = this.state;

    return (
      <div className="app">
        <FormInput
          inputValue={newTask}
          onChangeInputValue={this.setNewTask}
          submitNewTask={this.addNewTask}
        />
        <Counter unDoneTaskCounter={this.getNotDoneTasks()} />
        <Content
          tasks={this.getOrderedTodos()}
          onTodoClick={this.onTodoClick}
        />
      </div>
    );
  }
}
