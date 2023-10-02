import styles from './not-found.module.css';
import bgImage from '../images/404.png';

export const NotFoundPage = () => {
    return (
        <div className={ styles.wrapper }>
            {/*<div style={ { width: '100%', height: '89vh', background: `no-repeat left top/cover url(${ bgImage })` } }>*/ }
            <img src={ bgImage } className={ styles.img } alt={ 'Page not found' } />
        </div>
    );
};