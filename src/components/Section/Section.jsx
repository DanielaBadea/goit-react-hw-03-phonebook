import styles from './Section.module.css';
import PropTypes from 'prop-types';

function Section ({title, children}) {
    return( 
    <section className={styles.sectionBook}>
        <h2 className={styles.titleBook}>{title}</h2>
        {children}
        </section>
    )
}
Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Section;