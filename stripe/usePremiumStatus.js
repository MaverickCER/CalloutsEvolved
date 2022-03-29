import { useEffect, useState } from "react";
import isUserPremium from "./isUserPremium";

const usePremiumStatus = (user) => {
  const [premiumStatus, setPremiumStatus] = useState(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async () => {
        setPremiumStatus(await isUserPremium());
      };
      try {
        checkPremiumStatus();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  return premiumStatus;
};

export default usePremiumStatus;
