import { json, redirect, type DataFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { FormInput } from '~/components/form/form-input';
import { FormSubmitButton } from '~/components/form/form-submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Routes } from '~/constants/routes';
import { AuthClient } from '~/integrations/auth/client';

export const meta: MetaFunction = () => {
  return [{ title: 'Login' }];
};

const loginFormSchema = z.object({
  password: z.string().min(1, 'Password is required.')
});

const loginFormValidator = withZod(loginFormSchema);

export async function loader({ request }: DataFunctionArgs) {
  const isAuthenticated = await AuthClient.IsAuthenticated(request);

  if (isAuthenticated) {
    return redirect(Routes.Dashbaord);
  }

  return new Response(null, { status: 200 });
}

export async function action({ request }: DataFunctionArgs) {
  const validationResult = await loginFormValidator.validate(await request.formData());

  if (validationResult.error) {
    return validationError(validationResult.error);
  }

  const { password } = validationResult.data;

  try {
    return await AuthClient.Login(request, password);
  } catch (_e) {
    return json({ message: 'Invalid password, try again.' });
  }
}

export default function Index() {
  const data = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            NHL Predict is guarded by a password. Please log in below.
          </CardDescription>
        </CardHeader>

        <ValidatedForm method="post" validator={loginFormValidator}>
          <CardContent className="space-y-4">
            {data && 'message' in data && typeof data.message === 'string' && (
              <p className="text-destructive">{data.message}</p>
            )}
            <FormInput label="Password" name="password" type="password" autoFocus />
            <FormSubmitButton className="w-full" label="Login" />
          </CardContent>
        </ValidatedForm>
      </Card>
    </div>
  );
}
