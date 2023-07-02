// import styles from './DoneList.module.css';
import { useContext } from 'react';
import ItemsContext from '../../store/itemsContext';
import DoneItem from '../DoneItem/DoneItem';
const DoneList = () => {
    const { doneList } = useContext(ItemsContext);

    const doneItems = doneList.map(done =>
        <DoneItem key={done.id} doneItem={done} />);

    return (
        <section>
            <ul>
                <h1>Done Items</h1>
                {doneItems}
            </ul>
        </section>
    );
};

export default DoneList;