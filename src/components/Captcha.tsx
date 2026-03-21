import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export interface CaptchaRef {
  reset: () => void;
  getValue: () => string | null;
}

interface CaptchaProps {
  siteKey: string;
  onChange?: (token: string | null) => void;
  onError?: () => void;
  onExpired?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  className?: string;
}

const Captcha = forwardRef<CaptchaRef, CaptchaProps>(
  (
    {
      siteKey,
      onChange,
      onError,
      onExpired,
      theme = 'light',
      size = 'normal',
      className,
    },
    ref
  ) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      getValue: () => {
        return recaptchaRef.current?.getValue() || null;
      },
    }));

    return (
      <div className={className}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={onChange}
          onError={onError}
          onExpired={onExpired}
          theme={theme}
          size={size}
        />
      </div>
    );
  }
);

Captcha.displayName = 'Captcha';

export default Captcha;
