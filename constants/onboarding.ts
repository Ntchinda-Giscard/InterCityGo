import onboarding1 from "@/assets/constants/onboarding1.svg";
import onboarding2 from "@/assets/constants/onboarding2.svg";
import onboarding3 from "@/assets/constants/onboarding3.svg";

export const onboardingImages = {
  onboarding1,
  onboarding2,
  onboarding3,
};

export const onboardingSteps = [
  {
    id: 1,
    title: "Travel Between Cities Easily",
    description:
      "Connect with drivers heading your way for convenient and affordable intercity travel.",
    image: onboardingImages.onboarding1,
  },
  {
    id: 2,
    title: "Meet Verified Drivers",
    description:
      "All our drivers are verified with background checks and reliable reviews from other travelers.",
    image: onboardingImages.onboarding2,
  },
  {
    id: 3,
    title: "Pay Securely",
    description:
      "Choose from multiple secure payment methods with protected transactions and no hidden fees.",
    image: onboardingImages.onboarding3,
  },
];
