import clsx from 'clsx';
import { useFormContext } from 'remix-validated-form';

export function FormError({ className, name }: { className?: string; name: string }) {
  const formContext = useFormContext();

  if (formContext.fieldErrors[name]) {
    return (
      <p className={clsx('text-center text-sm text-destructive', className)}>
        {formContext.fieldErrors[name]}
      </p>
    );
  }
}
