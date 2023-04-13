import NewsArticleGrid from '@/components/NewsArticleGrid';
import { NewsArticle } from '@/modals/NewsArticles'
import Head from 'next/head';
import React, {useState} from 'react'
import {Form, Button, Spinner, Alert} from 'react-bootstrap'

const SearchNewsPage = () => {
  const [ searchResult, setSearchResult] = useState<NewsArticle[] | null>(null);
  const [searchResultIsLoading, setSearchResultIsLoading] =  useState(false);
  const [searchResultIsError, setSearchResultIsError] =  useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('searchQuery')?.toString().trim();

    if (searchQuery){
      try{
        setSearchResult(null)
        setSearchResultIsError(false);
        setSearchResultIsLoading(true);

        const response = await fetch(`/api/search-news?q=` + searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResult(articles);
      
      }catch(error){
        console.error(error);
        setSearchResultIsError(true);
      }finally{
        setSearchResultIsLoading(false)
      }
    }
  }

  return (
    <>
    <Head>
      <title key='title'>Search News - NextJS News App</title> 
    </Head>
    <main>
      <h1>Search News</h1>
      <Alert>
          This is page uses <strong>client-side data fetching</strong> to show fresh data for every search.
          Requests are handled by our backend via <strong>API routes</strong>.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
          <Form.Label>Search query</Form.Label>
          <Form.Control name='searchQuery' placeholder='E.g. politics, sports, ...' />
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={searchResultIsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultIsLoading && <Spinner animation='border' />} 
        {searchResultIsError && <p>Please try again.</p>}
        {searchResult?.length === 0 && <p>Nothing found. Try a different query</p>}
        {searchResult && <NewsArticleGrid articles={searchResult}/>}
      </div>
    </main>
    </>
  )
}

export default SearchNewsPage