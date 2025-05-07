import './Dialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="nes-dialog is-rounded">
        <p className="title">{title}</p>
        <p>{message}</p>
        <div className="dialog-menu">
          <button 
            className="nes-btn is-primary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button 
            className="nes-btn is-error"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}