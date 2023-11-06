import { redirect } from '@remix-run/node';
import { Routes } from '~/constants/routes';

export async function loader() {
  return redirect(Routes.Login);
}
