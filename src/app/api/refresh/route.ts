import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { STORAGE_KEYS } from '@/shared/constants';
import { cookies } from 'next/headers';

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');

  return JSON.parse(jsonPayload);
}

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();

    const cookieStore = cookies();

    const { data } = await axiosInstance.post(PATH_API.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });

    const { exp, iat } = jwtDecode(data.accessToken);

    cookieStore.set(STORAGE_KEYS.TOKEN.ACCESS, data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: exp - iat || 0,
    });

    return Response.json(data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      return new Response('Unauthorized request', { status: 401 });
    }

    if (error.response?.status) {
      return new Response(error.response?.data ?? 'Something went wrong', {
        status: error.response?.status,
      });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
