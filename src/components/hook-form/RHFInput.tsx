import { useFormContext } from 'react-hook-form';
import './style.scss';
import { px } from '@/_utils';
import { CircleX } from 'lucide-react';
// ----------------------------------------------------------------------

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  unit?: string;
}

export default function RHFInput({
  name,
  readonly = false,
  required = false,
  loading = false,
  unit,
  ...other
}: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];

  const errorMessage = (errors[name]?.message as string) || '';

  const inputValue = watch(name);

  const handleClear = () => {
    setValue(name, '');
  };

  if (readonly) {
    return (
      <div className="RHFInput">
        <div>{watch(name)}</div>
      </div>
    );
  }

  return (
    <div className="RHFInput">
      <input
        style={isError ? { border: `${px(1)} solid rgb(255, 43, 43)` } : {}}
        {...register(name, { required })}
        {...other}
      />
      {inputValue && <CircleX className="RHFCloseIcon" onClick={handleClear} />}

      {isError && <p className="RHFHelperText">{errorMessage}</p>}
    </div>
  );
}
