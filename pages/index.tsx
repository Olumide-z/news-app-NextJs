import Image from 'next/image'
import {Alert} from'react-bootstrap';
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/modals/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticleGrid from '@/components/NewsArticleGrid'

interface BreakingNewsPageProps {
  newsArticle: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.API_KEY)
  const newsResponse: NewsResponse = await response.json();

  // console.log(newsResponse)
  return{
    props: {
      newsArticle: newsResponse.articles
    }
  }
  // let error go to 500 page
}

export default function BreakingNews({ newsArticle } : BreakingNewsPageProps) {
  return (
    <> 
      <Head>
        <title key='title'>Breaking News - NextJs News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
        This page uses <strong>getServerSideProps</strong> to fetch
        data server-side on every request. This allow search engines to crawl the page content and <strong>improves SEO</strong>
        </Alert>
        <NewsArticleGrid articles={newsArticle} />
      </main>
    </>
  )
}

