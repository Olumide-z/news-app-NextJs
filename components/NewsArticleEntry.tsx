import { NewsArticle } from '@/modals/NewsArticles'
import Image from 'next/image';
import React from 'react'
import styles from '@/styles/NewsArticleEntry.module.css';
import { Card } from 'react-bootstrap';
import placeholderImage from '../assets/images/newsArticle_placeholder.png';

interface NewsArticleEntryProps {
    article: NewsArticle
}

const NewsArticleEntry = ({ article }: NewsArticleEntryProps) => {
  
    const validImageUrl = (article.urlToImage?.startsWith('http://') || article.urlToImage?.startsWith('https://')) ? article.urlToImage : undefined
    
    return (
        <a href={article.url}>
            <Card className="h-100">
                <Image 
                    src={validImageUrl || placeholderImage} 
                    width={500}
                    height={200}
                    alt='News article image'
                    className={`card-img-top ${styles.image}`}
                />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                </Card.Body>
            </Card>
        </a>
  )
}

export default NewsArticleEntry