import { useFormState } from "react-dom";
import { subscribeToCompany } from "@/lib/companyActions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/contexts/DashboardContext";

export default function FollowButton({ companyId }: { companyId: string }) {
  const { user, refreshUser } = useDashboardData();
  const [isLoading, setIsLoading] = useState(false);

  const [state, formAction] = useFormState(subscribeToCompany, {
    message: "success"
  });

  const isSubscribed = user?.subscribedCompanies?.includes(Number(companyId));

  useEffect(() => {
    if (state.message === "success" && state.isSubscribed !== undefined) {
      void refreshUser();
      setIsLoading(false);
    }
  }, [state.message, state.isSubscribed, refreshUser]);

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    formAction(formData);
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="companyId" value={companyId} />
      <Button
        type="submit"
        className="text-foreground"
        variant={isSubscribed === true ? "secondary" : "outline"}
        disabled={state.message === "error" || isLoading}>
        {isSubscribed === true ? "Unsubscribe" : "Subscribe"}
      </Button>
      {state.message === "error" && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
