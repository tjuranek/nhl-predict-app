import { useField } from 'remix-validated-form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  defaultValue?: string;
  label: string;
  name: string;
}

export function FormTextarea(props: InputProps) {
  const { className, defaultValue, label, name, ...rest } = props;

  const { error, getInputProps } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit'
    }
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>

      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        {...getInputProps({ id: name, ...rest })}
      />

      {error && <p className="text-sm font-medium leading-none text-destructive">{error}</p>}
    </div>
  );
}
