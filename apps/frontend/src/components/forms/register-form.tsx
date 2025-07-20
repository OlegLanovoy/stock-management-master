
import type React from 'react';
import { FormContainer } from '../../components/ui/form-container';
import { SubmitButton } from '../../components/ui/submit-button';
import { FormFooter } from '../../components/ui/form-footer';
import { RegisterFormFields } from './register-form-fields';
import { useRegisterForm } from '../../hooks/use-register-form';

import { IRegisterDto } from '../../services/auth.service';

interface RegisterFormProps {
  onSubmit: (data: IRegisterDto) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

export function RegisterForm({
  onSubmit,
  onSwitchToLogin,
  isLoading = false,
}: RegisterFormProps) {
  const { formData, errors, updateField, validateForm } = useRegisterForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <RegisterFormFields
        formData={formData}
        errors={errors}
        onFieldChange={updateField}
      />

      <SubmitButton isLoading={isLoading} loadingText="Creating account...">
        Create Account
      </SubmitButton>

      <FormFooter
        text="Already have an account?"
        buttonText="Sign in"
        onSwitchForm={onSwitchToLogin}
      />
    </FormContainer>
  );
}
