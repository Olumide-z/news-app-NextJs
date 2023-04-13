import { NewsArticle } from '@/modals/NewsArticles'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import NewsArticleEntry from './NewsArticleEntry'

interface NewsArticleGridProps{
    articles: NewsArticle[]
}

const NewsArticleGrid = ({articles} : NewsArticleGridProps) => {
  return (
    <Row xs={1} sm={2} xl={3} className='g-4'>
        {articles.map((article) => (
            <Col key={article.url}>
                <NewsArticleEntry article={article}/>
            </Col>
        ))}
    </Row>
  )
}

export default NewsArticleGrid