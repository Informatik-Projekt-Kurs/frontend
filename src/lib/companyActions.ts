"use server";

import { z } from "zod";
import { getAccessToken, getUser } from "@/lib/authActions";
import { isClientUser } from "@/types/role";

type SubscriptionState = {
  message: "success" | "error";
  error?: string;
  isSubscribed?: boolean;
};

export async function subscribeToCompany(prevState: SubscriptionState, formData: FormData): Promise<SubscriptionState> {
  const companyId = formData.get("companyId") as string;

  // Validate the company ID
  const schema = z.object({
    companyId: z.string().min(1, { message: "Company ID is required" })
  });

  const parse = schema.safeParse({ companyId });

  if (!parse.success) {
    return {
      message: "error",
      error: parse.error.flatten().fieldErrors.companyId?.[0] ?? "Invalid company ID"
    };
  }

  // Get the access token for authentication
  const accessToken = await getAccessToken();

  if (accessToken === undefined) {
    return {
      message: "error",
      error: "Not authenticated"
    };
  }

  // Function to make the subscription request
  const makeSubscriptionRequest = async (token: string) => {
    return fetch(`${process.env.FRONTEND_DOMAIN}/api/user/subscribe?companyId=${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token
      }
    });
  };

  // First attempt with current access token
  const response = await makeSubscriptionRequest(accessToken);

  if (response.ok) {
    // Get fresh user data
    const user = await getUser(accessToken);
    const isSubscribed = isClientUser(user!) ? user?.subscribedCompanies.includes(Number(companyId)) : false;

    return {
      message: "success",
      isSubscribed
    };
  } else if (response.status === 429) {
    return {
      message: "error",
      error: "Too many requests"
    };
  } else {
    console.log(await response.text());
    return {
      message: "error",
      error: "Failed to update subscription"
    };
  }
}
