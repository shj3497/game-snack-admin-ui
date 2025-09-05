import {auth} from '../auth/auth';

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return c.json();
  }

  if (contentType && contentType.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  //? server action 의 경우 process.env.API_BASE_URL을 사용
  //? client action 의 경우 process.env.NEXT_PUBLIC_BASE_URL을 사용 후 next.config.ts에서 rewrite로 다시한번 변경되어짐
  const baseUrl = process.env.API_BASE_URL;

  // contextUrl을 절대 URL로 만듭니다.
  const url = new URL(contextUrl, baseUrl);
  const pathname = url.pathname;
  const search = url.search;

  // 최종 요청 URL을 생성합니다.
  const requestUrl = new URL(`${pathname}${search}`, baseUrl);

  return requestUrl.toString();
};

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const session = await auth();
  const token = session?.user.accessToken || '';

  const finalHeaders = new Headers({
    ...headers,
  });

  if (!finalHeaders.has('Authorization')) {
    if (token && typeof token === 'string') {
      // Authorization 헤더를 추가합니다.
      finalHeaders.append('Authorization', `Bearer ${token}`);
    }
  }

  return Object.fromEntries(finalHeaders.entries());
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);

  const requestHeaders = await getHeaders(options.headers);
  // console.log('Request URL:', requestUrl);
  // console.log('Request Headers:', requestHeaders);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  if (!response.ok) {
    throw data;
  }

  // //* origin
  // if (!response.ok) {
  //   const error = new Error(`Request failed with status ${response.status}`);
  //   (error as any).status = response.status;
  //   (error as any).data = data;
  //   throw error;
  // }

  return data;
};
