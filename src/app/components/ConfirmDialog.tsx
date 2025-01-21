import { ConfirmDialogProps } from "../types/confirmDialog"

const ConfirmDialog = ({ message, onConfirm, onCancel, isVisible }: ConfirmDialogProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#262626] rounded-lg p-6 w-[400px] text-center">
        <p className="text-white text-[16px] mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-[#1E6F9F] text-white rounded-md focus:outline-none"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-[#4EA8DE] text-white rounded-md focus:outline-none"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;