import React from 'react';
import { 
  FaSpinner, 
  FaCircleNotch, 
  FaCog, 
  FaSync,
  FaPulse
} from 'react-icons/fa';

const LoadingSpinner = ({
  size = 'md', // xs, sm, md, lg, xl
  variant = 'primary', // primary, secondary, success, danger, warning, info, light, dark
  type = 'spinner', // spinner, border, grow, dots, pulse, cog, sync
  text = '',
  fullScreen = false,
  overlay = false,
  center = true,
  inline = false,
  className = '',
  style = {},
  duration = '1s', // Animation duration
  showBackdrop = false,
  backdropOpacity = 0.5,
  textPosition = 'bottom', // top, bottom, left, right
  customIcon = null
}) => {
  // Size configurations
  const getSizeConfig = () => {
    const configs = {
      xs: {
        spinnerSize: '0.75rem',
        fontSize: '0.75rem',
        padding: '0.25rem',
        iconSize: 12
      },
      sm: {
        spinnerSize: '1rem',
        fontSize: '0.875rem',
        padding: '0.5rem',
        iconSize: 16
      },
      md: {
        spinnerSize: '1.5rem',
        fontSize: '1rem',
        padding: '0.75rem',
        iconSize: 20
      },
      lg: {
        spinnerSize: '2rem',
        fontSize: '1.125rem',
        padding: '1rem',
        iconSize: 24
      },
      xl: {
        spinnerSize: '3rem',
        fontSize: '1.25rem',
        padding: '1.5rem',
        iconSize: 32
      }
    };
    return configs[size] || configs.md;
  };

  const sizeConfig = getSizeConfig();

  // Spinner type components
  const SpinnerTypes = {
    spinner: () => (
      <div 
        className={`spinner-border text-${variant}`}
        style={{ 
          width: sizeConfig.spinnerSize, 
          height: sizeConfig.spinnerSize,
          animationDuration: duration
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ),
    
    border: () => (
      <div 
        className={`spinner-border text-${variant}`}
        style={{ 
          width: sizeConfig.spinnerSize, 
          height: sizeConfig.spinnerSize,
          animationDuration: duration
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ),
    
    grow: () => (
      <div 
        className={`spinner-grow text-${variant}`}
        style={{ 
          width: sizeConfig.spinnerSize, 
          height: sizeConfig.spinnerSize,
          animationDuration: duration
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ),
    
    dots: () => (
      <div className="loading-dots d-flex align-items-center">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`loading-dot bg-${variant}`}
            style={{
              width: `calc(${sizeConfig.spinnerSize} * 0.3)`,
              height: `calc(${sizeConfig.spinnerSize} * 0.3)`,
              margin: `0 calc(${sizeConfig.spinnerSize} * 0.1)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: duration
            }}
          />
        ))}
      </div>
    ),
    
    pulse: () => (
      <div 
        className={`loading-pulse bg-${variant}`}
        style={{ 
          width: sizeConfig.spinnerSize, 
          height: sizeConfig.spinnerSize,
          animationDuration: duration
        }}
      />
    ),
    
    cog: () => (
      <FaCog 
        className={`loading-cog text-${variant}`}
        size={sizeConfig.iconSize}
        style={{ animationDuration: duration }}
      />
    ),
    
    sync: () => (
      <FaSync 
        className={`loading-sync text-${variant}`}
        size={sizeConfig.iconSize}
        style={{ animationDuration: duration }}
      />
    ),
    
    custom: () => customIcon ? (
      <div 
        className={`text-${variant}`}
        style={{ 
          fontSize: sizeConfig.spinnerSize,
          animationDuration: duration
        }}
      >
        {customIcon}
      </div>
    ) : SpinnerTypes.spinner()
  };

  // Text component
  const LoadingText = () => text && (
    <div 
      className={`loading-text text-${variant === 'light' ? 'dark' : variant}`}
      style={{ 
        fontSize: sizeConfig.fontSize,
        marginTop: textPosition === 'bottom' ? '0.5rem' : 0,
        marginBottom: textPosition === 'top' ? '0.5rem' : 0,
        marginLeft: textPosition === 'right' ? '0.5rem' : 0,
        marginRight: textPosition === 'left' ? '0.5rem' : 0
      }}
    >
      {text}
    </div>
  );

  // Container classes
  const getContainerClasses = () => {
    let classes = ['loading-spinner'];
    
    if (center && !inline) classes.push('d-flex', 'justify-content-center', 'align-items-center');
    if (inline) classes.push('d-inline-flex', 'align-items-center');
    if (fullScreen) classes.push('loading-fullscreen');
    if (overlay) classes.push('loading-overlay');
    
    // Text positioning
    if (text) {
      switch (textPosition) {
        case 'top':
          classes.push('flex-column-reverse');
          break;
        case 'bottom':
          classes.push('flex-column');
          break;
        case 'left':
          classes.push('flex-row-reverse');
          break;
        case 'right':
          classes.push('flex-row');
          break;
        default:
          classes.push('flex-column');
      }
    }
    
    return classes.concat(className.split(' ')).filter(Boolean).join(' ');
  };

  // Container styles
  const getContainerStyles = () => {
    let containerStyle = { ...style };
    
    if (fullScreen) {
      containerStyle = {
        ...containerStyle,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: showBackdrop ? `rgba(255, 255, 255, ${backdropOpacity})` : 'transparent'
      };
    } else if (overlay) {
      containerStyle = {
        ...containerStyle,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: showBackdrop ? `rgba(255, 255, 255, ${backdropOpacity})` : 'transparent',
        zIndex: 10
      };
    }
    
    if (!inline) {
      containerStyle.padding = sizeConfig.padding;
    }
    
    return containerStyle;
  };

  const SpinnerComponent = SpinnerTypes[type] || SpinnerTypes.spinner;

  return (
    <div 
      className={getContainerClasses()}
      style={getContainerStyles()}
      role="status"
      aria-live="polite"
      aria-label={text || 'Loading'}
    >
      {textPosition === 'top' && <LoadingText />}
      {textPosition === 'left' && <LoadingText />}
      
      <div className="loading-spinner-icon">
        <SpinnerComponent />
      </div>
      
      {textPosition === 'right' && <LoadingText />}
      {(textPosition === 'bottom' || !textPosition) && <LoadingText />}
    </div>
  );
};

// Predefined loading components for common use cases
export const PageLoader = ({ text = 'Loading page...', ...props }) => (
  <LoadingSpinner
    fullScreen
    showBackdrop
    size="lg"
    text={text}
    type="spinner"
    {...props}
  />
);

export const TableLoader = ({ text = 'Loading data...', ...props }) => (
  <LoadingSpinner
    size="md"
    text={text}
    type="spinner"
    center
    className="my-4"
    {...props}
  />
);

export const ButtonLoader = ({ text = '', size = 'sm', ...props }) => (
  <LoadingSpinner
    size={size}
    text={text}
    type="spinner"
    inline
    textPosition="right"
    {...props}
  />
);

export const CardLoader = ({ text = 'Loading...', ...props }) => (
  <LoadingSpinner
    overlay
    showBackdrop
    backdropOpacity={0.8}
    size="md"
    text={text}
    type="spinner"
    {...props}
  />
);

export const InlineLoader = ({ text = '', size = 'sm', ...props }) => (
  <LoadingSpinner
    size={size}
    text={text}
    inline
    textPosition="right"
    {...props}
  />
);

// Loading skeleton component
export const LoadingSkeleton = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rounded',
  animation = 'pulse',
  count = 1
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`loading-skeleton ${variant} ${animation} ${className}`}
      style={{ 
        width, 
        height,
        marginBottom: count > 1 && index < count - 1 ? '0.5rem' : 0
      }}
    />
  ));

  return count === 1 ? skeletons[0] : <div className="loading-skeleton-group">{skeletons}</div>;
};

// Loading dots component
export const LoadingDots = ({ 
  size = 'md',
  variant = 'primary',
  count = 3,
  className = ''
}) => {
  const sizeMap = {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px'
  };

  const dotSize = sizeMap[size] || sizeMap['md'];

  return (
    <div className={`loading-dots-container d-inline-flex align-items-center ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`loading-dot bg-${variant}`}
          style={{
            width: dotSize,
            height: dotSize,
            margin: '0 4px',
            borderRadius: '50%',
            animation: 'loading-bounce 1s infinite',
            animationDelay: `${index * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};


export default LoadingSpinner;