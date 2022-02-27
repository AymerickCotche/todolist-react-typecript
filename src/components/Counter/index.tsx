// == Import
import * as React from 'react';
import * as PropTypes from 'prop-types';
import './styles.scss';

// == Composant
type MyProps = {
  unDoneTaskCounter: number;
};

function Counter({ unDoneTaskCounter }: MyProps) {
  return (
    <p className="counter">
      {unDoneTaskCounter} tâche{unDoneTaskCounter > 1 ? 's' : ''} en cours
    </p>
  );
}

Counter.propTypes = {
  unDoneTaskCounter: PropTypes.number.isRequired,
};

// == Export
export default Counter;
