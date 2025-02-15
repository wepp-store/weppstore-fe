import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const cookieStore = cookies();

    const { data } = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);

    cookieStore.set('weppstore_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3600 * 1000,
    });

    return Response.json(data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      return new Response('Unauthorized request', { status: 401 });
    }

    return new Response('Internal server ERROR! Something went wrong', {
      status: 500,
    });
  }
}
