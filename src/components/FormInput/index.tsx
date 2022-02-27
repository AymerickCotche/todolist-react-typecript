// == Import
import * as React from 'react';
import * as PropTypes from 'prop-types';
import './styles.scss';

// == Composant

type MyProps = {
  inputValue: string;
  onChangeInputValue: Function;
  submitNewTask: Function;
};
function FormInput({ inputValue, onChangeInputValue, submitNewTask }: MyProps) {
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    onChangeInputValue(event.currentTarget.value);
  };
  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitNewTask(inputValue);
    }
  };
  return (
    <form className="form">
      <input
        type="text"
        className="form__item"
        placeholder="Ajouter une tâche"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleEnter}
      />
    </form>
  );
}

FormInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
  submitNewTask: PropTypes.func.isRequired,
};
// == Export
export default FormInput;
