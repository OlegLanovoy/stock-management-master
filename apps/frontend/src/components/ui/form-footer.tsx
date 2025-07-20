import { SwitchFormButton } from './switch-form-button';

interface FormFooterProps {
  text: string;
  buttonText: string;
  onSwitchForm: () => void;
}

export function FormFooter({
  text,
  buttonText,
  onSwitchForm,
}: FormFooterProps) {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-600">
        {text}{' '}
        <SwitchFormButton onClick={onSwitchForm}>{buttonText}</SwitchFormButton>
      </p>
    </div>
  );
}
