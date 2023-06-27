import styles from './Input.module.scss';

interface InputProps {
  value: string;
  label?: string;
  type?: 'text' | 'password';
  placeholder?: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, label, type = 'text', placeholder, required, className = '', onChange }) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      className={`${styles.input} ${className}`}
      title={required ? 'To pole jest obowiązkowe' : ''}
    >
      {label &&
        <label htmlFor={label}>
          {label}{required && ' *'}
        </label>
      }
      <input
        id={label}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      />
    </div>
  );
};