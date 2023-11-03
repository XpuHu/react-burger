import styles from './not-found.module.css';
import bgImage from '../../images/404.png';

export const NotFoundPage = () => {
    return (
        <div className={ styles.wrapper }>
            <img src={ bgImage } className={ styles.img } alt={ 'Page not found' } />
        </div>
    );
};