import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle, NewsResponse } from "@/modals/NewsArticles"
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Alert } from 'react-bootstrap';
import Head from "next/head";

interface CategoryNewsPageProps {
    newsArticle: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async() => {
    
    const categorySlugs = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];

    const paths = categorySlugs.map((slug) => ({params: { category: slug }}));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({params}) => {
    const category = params?.category?.toString();
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.API_KEY}`)
    const newResponse: NewsResponse = await response.json();

    return{
        props: { newsArticle: newResponse.articles },
        revalidate: 5 * 60
    }
    // let error go to 500 page
};

const CategoryNewsPage = ({newsArticle}: CategoryNewsPageProps) => {
    const router = useRouter();
    const categoryName = router.query.category?.toString();

    const title = " Category: " + categoryName;

    return (
    <>
        <Head>
            <title key="title">{`${title} - NextJS News App`}</title>
        </Head>
        <main>
            <h1>{title}</h1>
            <Alert>
                This is page uses <strong>getStaticProps</strong> for very high page loading speed
                and <strong>incremental static regeneration</strong> to show data not older than <strong>5 minutes</strong>.
            </Alert>
            <NewsArticleGrid articles={newsArticle}/>
        </main>
    </>
  )
}

export default CategoryNewsPage