import styles from './Input.module.scss';

interface InputProps {
  value: string;
  label?: string;
  type?: 'text' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rowsCount?: number;
  className?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, label, type = 'text', placeholder, required, rowsCount = 10, className = '', onChange }) => {
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
      <label r-if={label} htmlFor={label}>
        {label}{required && ' *'}
      </label>

      <textarea
        r-if={type === 'textarea'}
        id={label}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rowsCount}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
      />
      <input
        r-else
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