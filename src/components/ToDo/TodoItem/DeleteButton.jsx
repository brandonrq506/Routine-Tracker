import PropTypes from 'prop-types'
import styles from './DeleteButton.module.css';

import { useContext } from 'react';
import ItemsContext from '../../../store/itemsContext';

const DeleteButton = ({ id }) => {
    const { removeToDo } = useContext(ItemsContext);

    return (
        <button className={styles.deleteButton} onClick={() => removeToDo(id)}>
            X
        </button>
    );
};

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DeleteButton;