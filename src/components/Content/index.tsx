// == Import
import * as React from 'react';
import * as PropTypes from 'prop-types';
import './styles.scss';

// == Composant
type MyProps = {
  tasks: { id: number; label: string; done: boolean }[];
  onTodoClick: Function;
};

function Content({ tasks, onTodoClick }: MyProps) {
  const tasksList = tasks.map(({ id, label, done }) => (
    <li key={id}>
      <label
        htmlFor={`task-${id}`}
        className={`list__item ${done ? 'list__item--done' : 'list__item'}`}
      >
        <input
          type="checkbox"
          checked={done}
          id={`task-${id}`}
          onChange={() => {
            onTodoClick({ id, label, done });
          }}
        />
        {label}
      </label>
    </li>
  ));
  return <ul className="list">{tasksList}</ul>;
}
Content.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      done: PropTypes.bool,
    }),
  ).isRequired,
};
// == Export
export default Content;
