import { useState, useEffect } from "react";
import { IsIPAD } from "@/themes/app.constant";
import { Dimensions, Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
//@ts-ignore
import One from "@/assets/images/onboarding/1.png";
//@ts-ignore
import Two from "@/assets/images/onboarding/2.png";
//@ts-ignore
import Three from "@/assets/images/onboarding/3.png";
import api from "@/constants/api";

export const useJudgments = () => {
  const [judgments, setJudgments] = useState("");

  useEffect(() => {
    const fetchJudgments = async () => {
      try {
        const response = await api.get("/judgments/l1/"); 
        if (response?.data) {
          setJudgments(response.data);
        }
      } catch (error) {
        console.error("Error fetching judgments:", error);
      }
    };

    fetchJudgments();
  }, []);

  return { judgments, setJudgments };
};


export const onBoardingSlides: onBoardingSlidesTypes[] = [
  {
    color: "#FFC0CB",
    image: (
      <Image
        source={Three}
        style={{
          width: IsIPAD ? scale(285) : scale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
    title: "Step Into",
    secondTitle: "the Courtroom",
    subTitle:
      "Practice trials anytime, anywhere with our virtual moot court",
  },
  {
    color: "#40E0D0",
    title: "Master",
    image: (
      <Image
        source={One}
        style={{
          width: IsIPAD ? verticalScale(285) : verticalScale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
    secondTitle: "Legal Knowledge",
    subTitle:
      "Explore a comprehensive library of cases, laws and judgments, simplified with AI",
  },
  {
    color: "#A7F893",
    title: "Track",
    image: (
      <Image
        source={Two}
        style={{
          width: IsIPAD ? scale(285) : scale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
    secondTitle: "Your Goals",
    subTitle:
    "Set milestones, earn badges, and monitor your progress as you grow.",
  },
];

// onboarding variables
export enum Side {
  LEFT,
  RIGHT,
  NONE,
}
export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

export const AITipsData = [
  {
    id: 1,
    question: "How can I use the AI judge to improve my argument?",
    answer:
      "You can leverage the AI judge's insights to guide your argument preparation and refine your approach during the session.",
  },
  {
    id: 2,
    question: "Can I ask the AI judge clarifying questions?",
    answer:
      "Yes, feel free to ask the AI judge for clarification if you’re unsure about a ruling or response. This will help you better understand the case.",
  },
  {
    id: 3,
    question: "How should I handle feedback from the AI judge?",
    answer:
      "The AI judge may provide feedback on your performance. Use this feedback to refine your skills and improve future performances.",
  },
  {
    id: 4,
    question: "What should I know about the limitations of the AI judge?",
    answer:
      "The AI judge follows programmed logic and may not account for nuances like human emotion or creative legal arguments. Keep this in mind when presenting your case.",
  },
];

export const AIRulesData = [
  {
    id: 1,
    question: "How should I interact with the AI judge?",
    answer:
      "Respect the AI judge's decisions and responses as you would a human judge, even if you disagree with its ruling.",
  },
  {
    id: 2,
    question: "How can I ensure the AI judge understands my argument?",
    answer:
      "Provide clear and structured inputs when presenting arguments or evidence, so the AI can process them accurately.",
  },
  {
    id: 3,
    question: "Can I manipulate the AI judge?",
    answer:
      "No, you should not attempt to manipulate the AI judge with irrelevant or misleading information. Always present honest and relevant data.",
  },
  {
    id: 4,
    question: "Should I follow the AI judge’s procedural instructions?",
    answer:
      "Yes, always adhere to the procedural instructions from the AI judge, including time limits and evidence submission protocols.",
  },
];

// banner data
export const bannerData = [
  {
    image:
      "https://img.freepik.com/free-vector/law-firm-concept-illustration_114360-8746.jpg?t=st=1732824304~exp=1732827904~hmac=0b283edf58e8184be2809feada8a2ee8beeb32f203bddeb49a0432ba98dcc492&w=1060",
    url: "https://lawbook.com",
  },
  {
    image:
      "https://img.freepik.com/free-vector/law-firm-concept-illustration_114360-8626.jpg?t=st=1732824370~exp=1732827970~hmac=45204c8ca61a51f9d2cea7366fea4f8f2cc73708562ca7236b25ea51b7a0fd30&w=1060",
    url: "https://lawbook.com",
  },
  {
    image:
      "https://img.freepik.com/free-vector/flat-lawyers-day-background_23-2149250815.jpg?t=st=1732824424~exp=1732828024~hmac=c9ab3bae99e176a0298c1f7efa05fe8ce94e53db8aacecc58222dab918d8dc1b&w=1060",
    url: "https://lawbook.com",
  },
];

export const videoLessonsData = [
  {
    url: "https://youtu.be/hGB-6VAcM6U",
    thumbnail:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1717660359/WhatsApp_Image_2024-06-04_at_4.31.27_AM_afd4bw.jpg",
    title:
      "All Functional LMS mobile App with React Native,Expo,Typescript,Express js",
  },
  {
    url: "https://youtu.be/BrrwtCt7d-Y",
    thumbnail:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574008/WhatsApp_Image_2024-02-29_at_2.00.10_AM_zpk4qe.jpg",

    title:
      "SaaS Email Newsletter platform by using next14, typescript, AWS SES, AstraDb, Stripe",
  },
  {
    url: "https://youtu.be/mzbOqy5DWzE",
    thumbnail:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574100/AI_Prompt_Selling_Marketplace_with_next_13.5_Full_Project_ezvziv.png",
    title:
      "SaaS Email Newsletter platform by using next14, typescript, AWS SES, AstraDb, Stripe",
  },
  {
    url: "https://youtu.be/UxirFATvWTo",
    thumbnail:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574204/Food_Delivery_Web_App_anntu1.png",
    title:
      "Food Delivery Web Application using Microservice Architecture with Nest.js,GraphQL,Next.js",
  },
  {
    url: "https://youtu.be/h4dW5LNtcoE",
    thumbnail:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574236/Let_s_Build_a_Full-stack_website_without_backend_ny0lcl.png",
    title:
      "Let's Make a Full-stack Website Without a Backend Next 14 | OneEntry CMS | Tailwind css | Typescript",
  },
  {
    url: "https://youtu.be/4aS7g8OYHbg",
    thumbnail:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1723424082/WhatsApp_Image_2024-08-09_at_5.00.52_AM_wzokd1.jpg",
    title:
      "Let's build one real-time car booking full-stack mobile app by using Expo React Native",
  },
];

export const NotificationsData = [
  {
    id: "1",
    title: "New Answer Received",
    message: "You have a new answer in your question",
    status: "Unread",
  },
  {
    id: "2",
    title: "New Reply Received",
    message: "You have a new reply in your support question",
    status: "Unread",
  },
];


export const FAQData = [
  {
    id: 1,
    question: "Can I participate in the moot court feature without any prior experience?",
    answer:
      "Absolutely! The moot court feature is designed for all levels, whether you're a beginner or an experienced law student. It’s a great way to practice and build your skills.",
  },
  {
    id: 3,
    question: "Can I use the AI judge feature offline?",
    answer:
      "No, the AI judge feature requires an active internet connection as it utilizes advanced cloud-based processing to analyze and respond to your arguments.",
  },
  {
    id: 5,
    question: "Can I download case studies or materials from the app?",
    answer:
      "For security and copyright reasons, materials cannot be downloaded directly. However, you can access all resources anytime within the app.",
  },
  {
    id: 6,
    question: "Is my progress tracked across different features?",
    answer:
      "Yes, your progress is automatically tracked across case studies, moot trials, and other activities. You can view your milestones and badges within your profile.",
  },
  {
    id: 7,
    question: "Can I collaborate with friends or peers in the app?",
    answer:
      "Yes, you can collaborate with peers by inviting them to participate in moot trials or group discussions within the app.",
  },
];
