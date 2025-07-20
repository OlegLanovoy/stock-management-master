import type React from 'react';
import { FormContainer } from '../../components/ui/form-container';
import { SubmitButton } from '../../components/ui/submit-button';
import { FormFooter } from '../../components/ui/form-footer';
import { LoginFormFields } from './login-form-fields';
import { useLoginForm } from '../../hooks/use-login-form';
import { ILoginDto } from '../../services/auth.service';

interface LoginFormProps {
  onSubmit: (data: ILoginDto) => void;
  onSwitchToRegister: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  onSubmit,
  onSwitchToRegister,
  isLoading = false,
}: LoginFormProps) {
  const { formData, errors, updateField, validateForm } = useLoginForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <LoginFormFields
        formData={formData}
        errors={errors}
        onFieldChange={updateField}
      />

      <SubmitButton isLoading={isLoading} loadingText="Signing in...">
        Sign In
      </SubmitButton>

      <FormFooter
        text="Don't have an account?"
        buttonText="Sign up"
        onSwitchForm={onSwitchToRegister}
      />
    </FormContainer>
  );
}
