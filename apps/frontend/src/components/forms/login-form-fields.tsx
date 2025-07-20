import { FormField } from '../../components/ui/form-field';
import { FormFieldsGroup } from '../../components/ui/form-fields-group';
import { ILoginDto } from '../../services/auth.service';

interface LoginFormFieldsProps {
  formData: ILoginDto;
  errors: Partial<ILoginDto>;
  onFieldChange: (field: keyof ILoginDto, value: string) => void;
}

export function LoginFormFields({
  formData,
  errors,
  onFieldChange,
}: LoginFormFieldsProps) {
  return (
    <FormFieldsGroup>
      <FormField
        label="Email"
        value={formData.email}
        onChange={(value: string) => onFieldChange('email', value)}
        placeholder="Enter your email"
        error={errors.email}
        required
      />

      <FormField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(value: string) => onFieldChange('password', value)}
        placeholder="Enter your password"
        error={errors.password}
        required
      />
    </FormFieldsGroup>
  );
}
