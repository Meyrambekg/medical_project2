import { ListModel } from "../models/common";

const axios = require('axios');
axios.defaults.baseURL = "http://localhost:8000";

export class ArticleService {

  public async listArticles(params?: any): Promise<ListModel<any>> {
    const res = await axios.get(`/articles/`);
    return res.data;
  }

  public async getArticle(id: number): Promise<any> {
    const res = await axios.get(`/articles/${id}/`);
    return res.data;
  }

  public async listComments(id: number): Promise<ListModel<any>> {
    const res = await axios.get(`/articles/${id}/comments/`);
    return res.data;
  }

  public async postComment(id: number, payload: any): Promise<any> {
    const res = await axios.post(`/articles/${id}/comments/`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    });
    return res.data;
  }

  public async patchComment(id: number, commentId: number, payload: any): Promise<any> {
    const res = await axios.patch(`/articles/${id}/comments/${commentId}/`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    });
    return res.data;
  }

  public async deleteComment(id: number, commentId: number): Promise<any> {
    const res = await axios.delete(`/articles/${id}/comments/${commentId}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    });
    return res.data;
  }
}