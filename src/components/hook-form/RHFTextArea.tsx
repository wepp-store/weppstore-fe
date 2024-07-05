import { Controller, useFormContext } from 'react-hook-form';
import './style.scss';
import React from 'react';
import { px } from '@/_utils';
// ----------------------------------------------------------------------

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  unit?: string;
  height?: string;
}

export default function RHFTextarea({
  name,
  label,
  placeholder,
  readonly = false,
  required = false,
  loading = false,
  height = '100%',
  unit,
  ...other
}: Props) {
  const handleResizeHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = px(element.scrollHeight);
  };

  const { control, watch } = useFormContext();

  if (readonly) {
    return <div className="RHFTextarea">{watch(name)}</div>;
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && '필수입니다.' }}
      render={({
        field: { value, onChange, ref },
        fieldState: { error },
        ...props
      }) => (
        <div className="RHFTextarea">
          {label && (
            <label className="RHFLabel" htmlFor={name}>
              {label}
              {required && <span className="RHFRequired">*</span>}
            </label>
          )}
          <textarea
            style={{
              border: error ? `${px(1)} solid rgb(255, 43, 43)` : '',
              height, // 기본값 설정
            }}
            value={value}
            onChange={onChange}
            ref={ref}
            placeholder={placeholder}
            {...other}
            {...props}
            onInput={(e: any) => handleResizeHeight(e.target)}
          />
        </div>
      )}
    />
  );
}
