import { type DataFunctionArgs, type MetaFunction } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { FormInput } from '~/components/form/form-input';
import { FormSubmitButton } from '~/components/form/form-submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { createGame } from '~/integrations/db/repos/game';

export const meta: MetaFunction = () => {
  return [{ title: 'NHL Predict' }, { name: 'description', content: 'Welcome to NHL Predict!' }];
};

const createGameFormSchema = z.object({
  homeTeam: z.string().min(1, 'Home team is required.'),
  awayTeam: z.string().min(1, 'Away team is required.')
});

const createGameFormValidator = withZod(createGameFormSchema);

export async function action({ request }: DataFunctionArgs) {
  const validationResult = await createGameFormValidator.validate(await request.formData());

  if (validationResult.error) {
    return validationError(validationResult.error);
  }

  const { homeTeam, awayTeam } = validationResult.data;
  await createGame({ homeTeam, awayTeam });

  return new Response(null, { status: 200 });
}

export default function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Create Game</CardTitle>
          <CardDescription>A test entity to demo GET and POST to Remix routes.</CardDescription>
        </CardHeader>

        <ValidatedForm method="post" validator={createGameFormValidator}>
          <CardContent className="grid grid-cols-2 gap-6">
            <FormInput label="Home Team" name="homeTeam" placeholder="Minnesota Wild" />
            <FormInput label="Away Team" name="awayTeam" placeholder="Colorado Avalanche" />
            <FormSubmitButton className="col-span-2" label="Create Game" />
          </CardContent>
        </ValidatedForm>
      </Card>
    </div>
  );
}
