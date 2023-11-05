import clsx from 'clsx';
import { useField } from 'remix-validated-form';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SelectObject {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  defaultValue?: string;
  label: string;
  name: string;
  values: SelectObject[];
}

export function FormSelect(props: SelectProps) {
  const { className, defaultValue, label, name, values } = props;

  const { error, getInputProps } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit'
    }
  });

  return (
    <div className={clsx('flex w-full flex-col gap-2', className)}>
      <Label htmlFor={name}>{label}</Label>

      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger id={name} name={name}>
          <SelectValue id={name} {...getInputProps({ id: name })} />
        </SelectTrigger>

        <SelectContent>
          {values.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <Label className="text-destructive">{error}</Label>}
    </div>
  );
}
