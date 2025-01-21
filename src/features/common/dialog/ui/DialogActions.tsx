import { Button } from "@shared/ui"

interface DialogActionsProps {
  onSubmit: () => void
  submitText: string
  disabled?: boolean
}

export const DialogActions = ({ onSubmit, submitText, disabled }: DialogActionsProps) => (
  <div className="flex justify-end gap-2 mt-4">
    <Button onClick={onSubmit} disabled={disabled}>
      {submitText}
    </Button>
  </div>
)
