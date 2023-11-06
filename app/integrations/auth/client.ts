import { SessionStorage, createCookieSessionStorage, redirect } from '@remix-run/node';
import { env } from '~/constants/env';
import { Routes } from '~/constants/routes';

const COOKIE_NAME = '__session';
const SESSION_NAME = 'auth';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: COOKIE_NAME,
    httpOnly: true,
    secrets: [env.COOKIE_SECRET],
    maxAge: 365 * 60 * 60,
    secure: true
  }
});

class AppAuthClient {
  private sessionStorage: SessionStorage;

  constructor(sessionStorage: SessionStorage) {
    this.sessionStorage = sessionStorage;
  }

  public async Login(request: Request, password: string) {
    if (password !== env.PASSWORD) {
      throw new Error('Invalid password.');
    }

    const session = await this.sessionStorage.getSession(request.headers.get('Cookie'));
    session.set(SESSION_NAME, { isAuthenticated: true });

    return redirect(Routes.Dashbaord, {
      headers: { 'Set-Cookie': await this.sessionStorage.commitSession(session) }
    });
  }

  public async Logout() {
    return redirect(Routes.Login, {
      headers: {
        'Set-Cookie': `${COOKIE_NAME}=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`
      }
    });
  }

  public async IsAuthenticated(request: Request) {
    const session = await this.sessionStorage.getSession(request.headers.get('Cookie'));
    const sessionData = session.get(SESSION_NAME);

    return sessionData?.isAuthenticated;
  }
}

export const AuthClient = new AppAuthClient(sessionStorage);
