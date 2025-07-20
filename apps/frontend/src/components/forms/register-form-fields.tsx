'use client';

import { FormField } from '../../components/ui/form-field';
import { FormFieldsGroup } from '../ui/form-fields-group';
import { IRegisterDto } from '../../services/auth.service';

interface RegisterFormFieldsProps {
  formData: IRegisterDto;
  errors: Partial<IRegisterDto>;
  onFieldChange: (field: keyof IRegisterDto, value: string) => void;
}

export function RegisterFormFields({
  formData,
  errors,
  onFieldChange,
}: RegisterFormFieldsProps) {
  return (
    <FormFieldsGroup>
      <FormField
        label="Email"
        value={formData.email}
        onChange={(value) => onFieldChange('email', value)}
        placeholder="Enter your email"
        error={errors.email}
        required
      />

      <FormField
        label="Username"
        value={formData.username}
        onChange={(value) => onFieldChange('username', value)}
        placeholder="Choose a username"
        error={errors.username}
        required
      />

      <FormField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(value) => onFieldChange('password', value)}
        placeholder="Create a password"
        error={errors.password}
        required
      />
    </FormFieldsGroup>
  );
}
