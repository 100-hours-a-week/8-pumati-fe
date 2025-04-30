export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  required?: boolean;
};
