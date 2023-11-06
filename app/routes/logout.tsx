import { AuthClient } from '~/integrations/auth/client';

export async function loader() {
  return await AuthClient.Logout();
}
