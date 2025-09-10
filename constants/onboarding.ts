import onboarding1 from "@/assets/images/ob1.png";
import onboarding2 from "@/assets/images/ob2.png";
import onboarding3 from "@/assets/images/ob3.png";
import onboarding4 from "@/assets/images/ob4.png";

export const onboardingImages = {
  onboarding1,
  onboarding2,
  onboarding3,
  onboarding4,
};

export const onboardingSteps = [
  {
    id: 0,
    title: "Find Trips Near You",
    description:
      "Connect with drivers heading your way for convenient and affordable intercity travel.",
    image: onboardingImages.onboarding1,
  },
  {
    id: 1,
    title: "Meet Verified Drivers",
    description:
      "All our drivers are verified with background checks and reliable reviews from other travelers.",
    image: onboardingImages.onboarding2,
  },
  {
    id: 2,
    title: "Chat with Drivers Easily",
    description:
      "Stay connected before and during your trip with our built-in chat feature, helping you ease pick-ups.",
    image: onboardingImages.onboarding3,
  },
  {
    id: 3,
    title: "Have a Safe Journey",
    description:
      "Sit back and enjoy a smooth, reliable, and secure travel experience, with peace of mind every step of the way.",
    image: onboardingImages.onboarding4,
  },
];
