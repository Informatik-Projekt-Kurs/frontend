import { useFormState } from "react-dom";
import { subscribeToCompany } from "@/lib/companyActions";
import { Button } from "@/components/ui/button";
import { useOptimistic, useEffect, useTransition } from "react";
import { useUser } from "@/components/dashboard/UserContext";

export default function FollowButton({ companyId }: { companyId: string }) {
  const { user, refreshUser } = useUser();
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useFormState(subscribeToCompany, {
    message: "success"
  });

  const baseSubscribed = user?.subscribedCompanies?.includes(Number(companyId));

  const [optimisticSubscribed, setOptimisticSubscribed] = useOptimistic(
    baseSubscribed,
    (_, newValue: boolean) => newValue
  );

  // Update the optimistic state when the actual subscription status changes
  useEffect(() => {
    if (state.message === "success" && state.isSubscribed !== undefined) {
      startTransition(() => {
        if (state.isSubscribed === true) {
          setOptimisticSubscribed(state.isSubscribed);
        }
        void refreshUser();
      });
    }
  }, [state.message, state.isSubscribed, refreshUser]);

  const handleAction = async (formData: FormData) => {
    startTransition(() => {
      setOptimisticSubscribed(optimisticSubscribed === false);
    });
    formAction(formData);
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="companyId" value={companyId} />
      <Button
        type="submit"
        className="text-foreground"
        variant={optimisticSubscribed === true ? "secondary" : "outline"}
        disabled={state.message === "error" || isPending}>
        {optimisticSubscribed === true ? "Unsubscribe" : "Subscribe"}
      </Button>
      {state.message === "error" && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
