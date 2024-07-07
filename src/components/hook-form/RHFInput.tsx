import { useFormContext } from 'react-hook-form';
import styles from './style.module.scss';
import { bindClassNames, px } from '@/_utils';
import { CircleX } from 'lucide-react';

// ----------------------------------------------------------------------
const cx = bindClassNames(styles);
// ----------------------------------------------------------------------

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  unit?: string;
}

export default function RHFInput({
  name,
  label,
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
      <div className={cx('RHFInput')}>
        <div>{watch(name)}</div>
      </div>
    );
  }

  return (
    <div className={cx('RHFInput')}>
      {label && (
        <label className={cx('label')} htmlFor={name}>
          {label}
          {required && <span className={cx('required')}>*</span>}
        </label>
      )}
      <div className={cx('input')}>
        <input
          style={isError ? { border: `${px(1)} solid rgb(255, 43, 43)` } : {}}
          {...register(name, { required })}
          {...other}
        />
        {inputValue && (
          <CircleX className={cx('closeIcon')} onClick={handleClear} />
        )}
      </div>

      {isError && <p className={cx('helperText')}>{errorMessage}</p>}
    </div>
  );
}
