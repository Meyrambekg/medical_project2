import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { EMPTY_LIST, ListModel } from '../../models/common';
import { ArticleService } from '../../services/articles';
import './article.scss';

function CommentComponent(prop: { user: any, comment: any, child: boolean, postComment: (payload: any) => void, patchComment: (commentId: number, payload: any) => void, deleteComment: (commentId: number) => void }) {

  const [comment, setComment] = useState<string>(prop.comment.body)
  const [replyText, setReplyText] = useState<string>('')

  const [onEdit, setEdit] = useState(false)
  const [reply, setReply] = useState(false)

  const onReply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      reply: prop.comment.id,
      body: replyText
    }
    prop.postComment(payload)
    setReplyText('')
    setReply(false)
  }

  const onPatch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      body: comment
    }
    prop.patchComment(prop.comment.id, payload)
    setEdit(false)
  }

  const replyList: JSX.Element[] = prop.comment.replies.map((item: any, key: number) =>
    <CommentComponent
      user={prop.user}
      comment={item}
      key={key}
      child={true}
      postComment={prop.postComment}
      patchComment={prop.patchComment}
      deleteComment={prop.deleteComment} />
  )

  const loggedIn = prop.user;
  const commentOwner = prop.user?.id === prop.comment.owner.id;

  return (
    <div className='comment-item' style={{ marginLeft: prop.child ? 48 : 0 }}>
      <div className='comment-item-user'>
        <img className="comment-item-user-avatar" src={prop.comment.owner.avatar} alt="" />
        <span>{prop.comment.owner.full_name}</span>
        <div className='d-flex gap-2 flex-fill mx-2'>
          {loggedIn ? <button className='btn btn-sm btn-outline-primary' onClick={() => setReply(!reply)}> Ответить</button> : <></>}
          {loggedIn && commentOwner ? <button className='btn btn-sm btn-outline-danger' onClick={() => prop.deleteComment(prop.comment.id)}> Удалить</button> : <></>}
          {loggedIn && commentOwner ? <button className='btn btn-sm btn-outline-warning' onClick={() => { setEdit(!onEdit); setComment(prop.comment.body) }}> Изменить</button> : <></>}
        </div>
      </div>
      {
        onEdit ? <form onSubmit={onPatch}>
          <input
            placeholder="Комментарий..."
            className='comment-item-body form-textarea'
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
        </form> : <div className='comment-item-body' dangerouslySetInnerHTML={{ __html: prop.comment.body }}></div>
      }
      {
        reply ? <form onSubmit={onReply}>
          <input
            placeholder="Комментарий..."
            className='comment-item-body form-textarea'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)} />
        </form> : <></>
      }
      <div>
        {replyList}
      </div>
    </div>
  )
}

export default function ArticleDetailComponent(prop: { user: any }) {
  const { articleId } = useParams<{ articleId: string }>();
  const [isLoadingComments, setLoadingComments] = useState(true)
  const [article, setArticle] = useState<any>(null)
  const [comments, setComments] = useState<ListModel<any>>(EMPTY_LIST)
  const articlesService = new ArticleService()

  const [body, setBody] = useState('')

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    Promise.all([
      articlesService.getArticle(Number(articleId)),
      articlesService.listComments(Number(articleId))
    ]).then(([article, comments]) => {
      setArticle(article)
      setLoadingComments(false)
      setComments(comments)
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (body) {
      onPost({ body })
    }
  }

  function onPost(payload: any) {
    articlesService.postComment(+articleId!, payload).then(() => {
      articlesService.listComments(Number(articleId)).then(res => {
        setComments(res)
      })
    })
  }

  function onDelete(commentId: number) {
    articlesService.deleteComment(+articleId!, commentId).then(() => {
      articlesService.listComments(Number(articleId)).then(res => {
        setComments(res)
      })
    })
  }

  function onPatch(commentId: number, payload: any) {
    articlesService.patchComment(+articleId!, commentId, { ...payload, article: articleId }).then(() => {
      articlesService.listComments(+articleId!).then(res => {
        setComments(res)
      })
    })
  }

  const commentList: JSX.Element[] = comments.results.map((item, key) =>
    <CommentComponent
      user={prop.user}
      comment={item}
      key={key}
      child={false}
      postComment={(payload) => onPost(payload)}
      patchComment={(commentId, payload) => onPatch(commentId, payload)}
      deleteComment={(commentId) => onDelete(commentId)} />
  )

  const loggedIn = prop.user;

  return (
    <div className='article-detail'>
      {article !== null ? (
        <>
          <div className='breadcrubm mb-3'>
            <span> <Link to="/articles">Все статьи</Link> </span>
            <span> / </span>
            <span> {article.title} </span>
          </div>
          <div className='article card mb-5'>
            <h1 className='mb-4'>{article.title}</h1>
            <div className='article-body' dangerouslySetInnerHTML={{ __html: article.body }}></div>
          </div>
        </>
      ) : (<Spinner animation={'grow'} />)}
      {comments.results.length > 0 ? (
        <>
          <h3 style={{ width: "100%", textAlign: 'start' }} className="mb-4">Комментарии</h3>
          <div className='comment-holder card mb-5'>
            {loggedIn ? <form onSubmit={handleSubmit}>
              <input
                placeholder="Комментарий..."
                style={{ width: '100%' }}
                className='form-textarea mt-4'
                value={body}
                onChange={(e) => setBody(e.target.value)} />
            </form> : <></>}
            {commentList}
          </div>
        </>
      ) : <></>}
      {isLoadingComments ? <Spinner animation={'grow'} /> : <></>}
    </div>
  );
}
