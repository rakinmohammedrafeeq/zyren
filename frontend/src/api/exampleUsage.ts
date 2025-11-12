import api, { getJson, postJson, putJson, deleteJson } from '@/api/axios';
interface Paste {
  id: number;
  title: string;
  content: string;
  code: string;
  createdAt: string;
}
interface LoginResponse { token: string; role: string; }
export async function fetchMyPastes(): Promise<Paste[]> {
  return getJson<Paste[]>('/paste/me');
}
export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await postJson<LoginResponse, { email: string; password: string }>(
    '/auth/login',
    { email, password }
  );
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  localStorage.setItem('email', email);
  return data;
}
export async function updatePaste(id: number, title: string, content: string) {
  return putJson(`/paste/${id}`, { title, content });
}
export async function removePaste(id: number) {
  return deleteJson(`/paste/${id}`);
}
export async function rawFetchPublic(code: string) {
  const res = await api.get(`/public/${code}`);
  return res.data;
}