import { useState } from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import Modal from "../common/Modal";


export default function ConfirmSubmitFlow({ open, assignmentTitle, onCancel, onConfirmed }) {
  // Keeps track of which confirmation step is currently displayed.
   // Step 1 → Ask the student if they have submitted the work
  // Step 2 → Show the final warning and ask for confirmation
  const [step, setStep] = useState(1);  

  const close = () => {
    setStep(1);
    onCancel();
  };

  const finish = () => {
    setStep(1);
    onConfirmed();
  };

  return (
    <Modal open={open} onClose={close} title={step === 1 ? "Confirm submission" : "Final check"}>
      {step === 1 && (
        <div>
          <p className="text-sm text-slate-500 mb-5">
            Have you submitted <span className="font-medium text-ink-900">“{assignmentTitle}”</span> via
            the Drive link provided for this assignment?
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              onClick={close}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-ink-900/5"
            >
              Not yet
            </button>
            <button
              onClick={() => setStep(2)}
              className="rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 hover:bg-ink-800 transition-colors"
            >
              Yes, I have submitted
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg bg-gold-500/10 p-3 text-sm text-ink-900">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-gold-600" />
            <p>
              This marks the assignment as <strong>submitted</strong> and notifies your professor. Only
              confirm if your work is already uploaded to the Drive folder.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              onClick={() => setStep(1)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-ink-900/5"
            >
              Go back
            </button>
            <button
              onClick={finish}
              className="flex items-center justify-center gap-2 rounded-lg bg-good-600 px-4 py-2.5 text-sm font-medium text-paper-50 hover:brightness-95 transition-all"
            >
              <CheckCircle2 size={16} />
              Confirm submission
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
