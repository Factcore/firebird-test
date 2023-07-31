import styles from "./Button.module.scss";

const Button: React.FC<{
    onClick?: (() => void);
    children: React.ReactNode;
    className?: string;
}> = ({ className, onClick, children }) => {

    let restProps: { [key: string]: any } = {};
    if(onClick) restProps.onClick = onClick;

    return (
        <button className={`${styles.button} ${className}`} {...restProps}>{children}</button>
    );
};

export default Button;
