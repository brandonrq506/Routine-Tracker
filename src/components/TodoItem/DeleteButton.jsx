import PropTypes from 'prop-types'
// import styles from './DeleteButton.module.css';
import { useContext } from "react";
import ItemsContext from '../../store/itemsContext'

const DeleteButton = ({ itemId }) => {
    const { removeToDo } = useContext(ItemsContext);

    const onDelete = () => removeToDo(itemId);

    return (
        <button onClick={onDelete}>
            Delete
        </button>
    );
};

DeleteButton.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default DeleteButton;