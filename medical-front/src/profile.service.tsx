const axios = require('axios');
axios.defaults.baseURL = "http://localhost:8000";

export class ProfileService {

  public async login(payload: any): Promise<{ access: string, refresh: string }> {
    const res = await axios.post('/auth/login/', payload);
    return res.data;
  }

  public async signup(payload: any): Promise<any> {
    const res = await axios.post(`/auth/signup/`, payload);
    return res.data;
  }

  public async refresh(payload: any): Promise<any> {
    const res = await axios.post(`/auth/refresh/`, payload);
    return res.data;
  }

  public async profile(token: string): Promise<any> {
    const res = await axios.get(`/auth/profile/`, { headers: { 'Authorization': `Bearer ${token}` } });
    return res.data;
  }
}
