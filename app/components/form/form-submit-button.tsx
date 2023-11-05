import { useNavigation } from '@remix-run/react';
import { Loader } from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';

type FormSubmitButtonProps = ButtonProps & {
  className?: string;
  label: string;
  onClick?: () => void;
  variant?: string;
};

export function FormSubmitButton(props: FormSubmitButtonProps) {
  const { className, label, onClick, variant = 'default' } = props;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Button className={className} onClick={onClick} type="submit" variant={variant}>
      {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
