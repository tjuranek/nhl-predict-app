import clsx from 'clsx';
import { useEffect } from 'react';
import { useField } from 'remix-validated-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  name: string;
}

export function FormInput(props: InputProps) {
  const { className, label, name, defaultValue, ...rest } = props;

  const { error, getInputProps } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit'
    }
  });

  useEffect(() => {
    if (error) {
      console.log('ERROR: ', error);
    }
  }, [error]);

  return (
    <div className={clsx('flex w-full flex-col gap-2', className)}>
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        {...getInputProps({ id: name, ...rest })}
      />

      {error && <Label className="text-destructive">{error}</Label>}
    </div>
  );
}
