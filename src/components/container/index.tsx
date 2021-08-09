import React from 'react';
import Header from './header';

interface Props {
    title: string,
    goBackTo?: () => void,
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<Props> = ({ title, goBackTo, children, className }) => {
    return (
        <div className='container'>
            <Header goBackTo={goBackTo} title={title} />
            <div className={`container__body ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Container;