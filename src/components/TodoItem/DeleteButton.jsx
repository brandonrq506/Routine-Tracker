import PropTypes from 'prop-types'
// import styles from './DeleteButton.module.css';

const DeleteButton = ({ onDelete }) => {

    return (
        <button onClick={onDelete}>
            Delete
        </button>
    );
};

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;