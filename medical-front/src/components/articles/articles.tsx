import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EMPTY_LIST, ListModel } from '../../models/common';
import { ArticleService } from '../../services/articles';
import './articles.scss';

function ArticleCardComponent(props: { article: any }) {
  return <>
    <img className='article-card-image' src={props.article.image} alt="" />
    <div className='mt-3 d-flex justify-content-between align-items-center'>
      <h4 className='mb-0'>{props.article.title}</h4>
      <span>{props.article.views} просмотров</span>
    </div>
  </>
}

export default function ArticleListComponent() {
  const [isLoading, setLoading] = useState(true)
  const [list, setList] = useState<ListModel<any>>(EMPTY_LIST)
  const articlesService = new ArticleService()

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    setLoading(false)
    articlesService.listArticles().then(res => {
      setLoading(true)
      setList(res)
    })
  }

  const articleList: JSX.Element[] = list.results.map((article, key) =>
    <Link to={`/articles/${article.id}`} key={key} className="article-card card no_link">
      <ArticleCardComponent article={article} />
    </Link>
  )

  return (
    <div className='article'>
      {articleList}
      {isLoading ? <Spinner animation={'grow'} /> : <></>}
    </div>
  );
}
