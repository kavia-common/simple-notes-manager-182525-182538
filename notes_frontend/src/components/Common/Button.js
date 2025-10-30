/* eslint-disable react/prop-types */
// PUBLIC_INTERFACE
export default function Button({ children, className = '', variant = 'primary', ...rest }) {
  /** Accessible button base */
  const cls = ['btn'];
  if (variant === 'secondary') cls.push('secondary');
  if (variant === 'danger') cls.push('danger');
  if (className) cls.push(className);
  return (
    <button className={cls.join(' ')} {...rest}>
      {children}
    </button>
  );
}
