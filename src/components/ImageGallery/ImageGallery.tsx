import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import LazyLoad from 'react-lazyload';
import { ImageGalleryProps } from '../types';

const ImageGallery: React.FC<ImageGalleryProps> = ({data, onImageClick}) => {
    return (
        <ul className={s.list}>
            {data.map((item) => {
               return (
                   <li key={item.id} className={s.item}>
                       <LazyLoad className={s.fadeIn} offset={100} once height={200}>  
                             <ImageCard {...item} onImageClick={onImageClick} />
                       </LazyLoad>      
        </li>
    )
})}
        </ul>
    )
}

export default ImageGallery