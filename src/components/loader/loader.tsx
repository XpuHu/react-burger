import style from './loader.module.css';

export const Loader = () => {
    return (
        <div className={ style.loaderWrapper }>
            <span className={ style.loader }></span>
        </div>
    );
};