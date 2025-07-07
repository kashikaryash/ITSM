import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {FaTimes, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTrash, FaSave} from 'react-icons/fa';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // xs, sm, md, lg, xl, fullscreen
  type = 'default', // default, confirm, alert, success, error, warning, info
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  actions,
  loading = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  customHeader,
  customFooter,
  maxHeight = 'auto',
  scrollable = false,
  centered = false,
  animation = true
}) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && event.target === backdropRef.current) {
      onClose();
    }
  };

  // Modal size classes
  const getSizeClass = () => {
    const sizeClasses = {
      xs: 'modal-sm',
      sm: 'modal-sm',
      md: '',
      lg: 'modal-lg',
      xl: 'modal-xl',
      fullscreen: 'modal-fullscreen'
    };
    return sizeClasses[size] || '';
  };

  // Type-based styling and icons
  const getTypeConfig = () => {
    const typeConfigs = {
      default: {
        headerClass: '',
        icon: null,
        iconColor: ''
      },
      confirm: {
        headerClass: 'bg-warning text-dark',
        icon: FaExclamationTriangle,
        iconColor: 'text-warning'
      },
      alert: {
        headerClass: 'bg-danger text-white',
        icon: FaExclamationCircle,
        iconColor: 'text-danger'
      },
      success: {
        headerClass: 'bg-success text-white',
        icon: FaCheckCircle,
        iconColor: 'text-success'
      },
      error: {
        headerClass: 'bg-danger text-white',
        icon: FaExclamationCircle,
        iconColor: 'text-danger'
      },
      warning: {
        headerClass: 'bg-warning text-dark',
        icon: FaExclamationTriangle,
        iconColor: 'text-warning'
      },
      info: {
        headerClass: 'bg-info text-white',
        icon: FaInfoCircle,
        iconColor: 'text-info'
      }
    };
    return typeConfigs[type] || typeConfigs.default;
  };

  // Default actions based on type
  const getDefaultActions = () => {
    if (actions) return actions;

    switch (type) {
      case 'confirm':
        return [
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: onClose
          },
          {
            label: 'Confirm',
            variant: 'primary',
            onClick: onClose
          }
        ];
      case 'alert':
      case 'error':
        return [
          {
            label: 'OK',
            variant: 'danger',
            onClick: onClose
          }
        ];
      case 'success':
      case 'info':
        return [
          {
            label: 'OK',
            variant: 'primary',
            onClick: onClose
          }
        ];
      default:
        return null;
    }
  };

  const typeConfig = getTypeConfig();
  const modalActions = getDefaultActions();

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`modal ${animation ? 'fade' : ''} ${isOpen ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden={!isOpen}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal-dialog ${getSizeClass()} ${centered ? 'modal-dialog-centered' : ''} ${scrollable ? 'modal-dialog-scrollable' : ''} ${className}`}
        role="document"
        ref={modalRef}
      >
        <div className="modal-content" style={{ maxHeight: maxHeight !== 'auto' ? maxHeight : undefined }}>
          {/* Modal Header */}
          {(title || customHeader || showCloseButton) && (
            <div className={`modal-header ${typeConfig.headerClass} ${headerClassName}`}>
              {customHeader ? (
                customHeader
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    {typeConfig.icon && (
                      <typeConfig.icon className={`me-2 ${typeConfig.iconColor}`} />
                    )}
                    <h5 className="modal-title mb-0">{title}</h5>
                  </div>
                  {showCloseButton && (
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={onClose}
                      disabled={loading}
                    >
                      <FaTimes />
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className={`modal-body ${bodyClassName}`}>
            {loading && (
              <div className="d-flex justify-content-center align-items-center py-3">
                <div className="spinner-border text-primary me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Loading...</span>
              </div>
            )}
            {!loading && children}
          </div>

          {/* Modal Footer */}
          {(modalActions || customFooter) && (
            <div className={`modal-footer ${footerClassName}`}>
              {customFooter ? (
                customFooter
              ) : modalActions ? (
                <div className="d-flex gap-2 justify-content-end w-100">
                  {modalActions.map((action, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`btn ${action.variant ? `btn-${action.variant}` : 'btn-secondary'} ${action.className || ''}`}
                      onClick={action.onClick}
                      disabled={loading || action.disabled}
                    >
                      {action.icon && <action.icon className="me-1" />}
                      {action.loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </span>
                          {action.loadingText || action.label}
                        </>
                      ) : (
                        action.label
                      )}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Create portal to render modal at document root
  return createPortal(
    <>
      {/* Modal Backdrop */}
      <div className={`modal-backdrop ${animation ? 'fade' : ''} ${isOpen ? 'show' : ''}`}></div>
      {modalContent}
    </>,
    document.body
  );
};

// Predefined modal variants for common use cases
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  loading = false,
  ...props
}) => {
  const actions = [
    {
      label: cancelText,
      variant: 'secondary',
      onClick: onClose,
      disabled: loading
    },
    {
      label: confirmText,
      variant: confirmVariant,
      onClick: onConfirm,
      loading: loading,
      loadingText: 'Processing...'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="confirm"
      size="sm"
      actions={actions}
      loading={loading}
      {...props}
    >
      <p className="mb-0">{message}</p>
    </Modal>
  );
};

export const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName,
  loading = false,
  ...props
}) => {
  const actions = [
    {
      label: 'Cancel',
      variant: 'secondary',
      onClick: onClose,
      disabled: loading
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: FaTrash,
      onClick: onDelete,
      loading: loading,
      loadingText: 'Deleting...'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="alert"
      size="sm"
      actions={actions}
      loading={loading}
      {...props}
    >
      <div>
        <p>{message}</p>
        {itemName && (
          <div className="alert alert-warning">
            <strong>Item to delete:</strong> {itemName}
          </div>
        )}
      </div>
    </Modal>
  );
};

export const FormModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  saveText = 'Save',
  cancelText = 'Cancel',
  loading = false,
  saveDisabled = false,
  size = 'lg',
  ...props
}) => {
  const actions = [
    {
      label: cancelText,
      variant: 'secondary',
      onClick: onClose,
      disabled: loading
    },
    {
      label: saveText,
      variant: 'primary',
      icon: FaSave,
      onClick: onSave,
      loading: loading,
      loadingText: 'Saving...',
      disabled: saveDisabled
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} actions={actions}
      loading={loading} scrollable={true} {...props}>
      {children}
    </Modal>
  );
};

export const InfoModal = ({
  isOpen,
  onClose,
  title = 'Information',
  message,
  type = 'info',
  ...props
}) => {
  const actions = [
    {
      label: 'OK',
      variant: 'primary',
      onClick: onClose
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      size="sm"
      actions={actions}
      {...props}
    >
      <p className="mb-0">{message}</p>
    </Modal>
  );
};

export default Modal;