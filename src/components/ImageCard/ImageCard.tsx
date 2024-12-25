import s from './ImageCard.module.css';
import { Data, SelectedImage } from '../types';

const ImageCard: React.FC<Data & { onImageClick: (imageUrl: SelectedImage) => void }> = ({ urls: { small, regular }, alt_description, likes, onImageClick, user: {name}, created_at }) => {
    
    const handleClick = () => {
        onImageClick({ url: regular, alt: alt_description, like: likes, username: name, date: created_at })
    }
    
    return (
        <div className={s.itemDiv}>
                <img src={small} alt={alt_description} onClick={handleClick} className={s.image}></img>
        </div>
    )
}

export default ImageCard
