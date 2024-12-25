import { forwardRef } from 'react';
import s from './LoadMoreBtn.module.css';
import { ButtonProps } from '../types';

const LoadMoreBtn = forwardRef<HTMLButtonElement, ButtonProps>(({onSubmit}, ref) => {
    return (
     <div>
        <button type='submit' className={s.btn} onClick={onSubmit} ref={ref}>Load more</button>
     </div>
)
})

LoadMoreBtn.displayName = 'LoadMoreBtn';
export default LoadMoreBtn;