import React from 'react';

interface Props {
    title: string,
    icon?: any,
    onClick?: () => void,
    className?: string
}

const Button: React.FC<Props> = ({ title, icon, onClick, className }) => {
    return (
        <button className={`button ${className}`} onClick={onClick} >
            {icon}
            {title}
        </button>
    );
}

export default Button;