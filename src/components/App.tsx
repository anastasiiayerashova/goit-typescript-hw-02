import './App.css'
import { fetchData } from '../unsplash-api';
import { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { ImSad } from "react-icons/im";

import { Data, SelectedImage } from './types';


export default function App() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
   
  const handleSearch = useCallback(async (newQuery: string, page: number = 1): Promise<void> => {
    if (newQuery === query) return
    try {
      setQuery(newQuery)
      setPage(page)
      setData([])
      setError(false)
      setLoading(true)
      const result: Data[] = await fetchData(newQuery, page)
      setData(result)
    }
  
    catch (error) {
      console.log(error)
      setError(true)
    }

    finally {
      setLoading(false)
    }
  }, [query, page])  
  
  const handleLoadMore = async (): Promise<void> => {
    const nextPage: number = page + 1;
    setPage(nextPage)

    try {
      const result: Data[] = await fetchData(query, nextPage)
      setData((prev: Data[]) => [...prev, ...result])

      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
     }
    }

    catch (error) {
      console.log(error)
      setError(true)
    }
  }

  const openModal = (imageUrl: SelectedImage): void => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen && e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])
 
  return (
    <div className='mainWrapper'>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {query !== '' && data.length <= 0 && !loading && !error && (<p>Unfortunately, no results were found...<ImSad size={24}/></p>)}
      {data.length > 0 && <ImageGallery data={data} onImageClick={openModal} />}
      {data.length > 0 && data.length % 12 === 0 && <LoadMoreBtn onSubmit={handleLoadMore} ref={loadMoreRef} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
    </div>
  )
}