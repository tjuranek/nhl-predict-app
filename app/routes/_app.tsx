import { DataFunctionArgs, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Routes } from '~/constants/routes';
import { AuthClient } from '~/integrations/auth/client';

export async function loader({ request }: DataFunctionArgs) {
  const isAuthenticated = await AuthClient.IsAuthenticated(request);

  if (!isAuthenticated) {
    return redirect(Routes.Login);
  }

  return new Response(null, { status: 200 });
}

export default function App() {
  return <Outlet />;
}
