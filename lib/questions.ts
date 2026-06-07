export type QuestionType = "single" | "multi" | "text" | "textarea" | "contact";

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: string[];
};

export const dietaryOptions = [
  "No Special Requirements",
  "Gluten-Free",
  "Vegan",
  "Vegetarian",
  "Dairy-Free",
  "Nut-Free",
  "Egg-Free",
  "Sugar-Conscious / Reduced Sugar",
  "Kosher",
  "Other Dietary Requirement",
];

export const baseQuestions: Question[] = [
  {
    id: "service",
    title: "What are you looking for today?",
    subtitle: "Choose the option that best describes your request.",
    type: "single",
    options: [
      "Wedding Cake",
      "Custom Celebration Cake",
      "Pastries & Desserts",
      "Artisan Breads",
      "Corporate Catering",
      "Private Event Catering",
      "Dessert Table",
      "Monthly Corporate Account",
      "Not Sure Yet",
    ],
  },
  {
    id: "timeline",
    title: "When do you need your order?",
    type: "single",
    options: [
      "This Week",
      "Within 2 Weeks",
      "Within 30 Days",
      "1–3 Months",
      "3–6 Months",
      "More Than 6 Months Away",
    ],
  },
];

export const weddingQuestions: Question[] = [
  {
    id: "weddingType",
    title: "What type of wedding are you planning?",
    type: "single",
    options: [
      "Intimate Wedding",
      "Traditional Wedding",
      "Luxury Wedding",
      "Destination Wedding",
      "Not Sure Yet",
    ],
  },
  {
    id: "guestCount",
    title: "Approximately how many guests?",
    type: "single",
    options: ["Under 25", "25–50", "50–100", "100–150", "150–250", "250+"],
  },
  {
    id: "additionalDesserts",
    title: "Would you like additional desserts?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: [
      "Macarons",
      "Mini Pastries",
      "Dessert Shooters",
      "Dessert Table",
      "Artisan Breads",
      "No Additional Desserts",
    ],
  },
  {
    id: "dietary",
    title: "Any dietary preferences or restrictions?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: dietaryOptions,
  },
  {
    id: "venue",
    title: "Where will your wedding be held?",
    subtitle: "You may enter the venue name or city.",
    type: "text",
  },
  {
    id: "budget",
    title: "Estimated cake and dessert budget?",
    type: "single",
    options: ["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+"],
  },
];

export const eventQuestions: Question[] = [
  {
    id: "eventType",
    title: "What type of event are you planning?",
    type: "single",
    options: [
      "Birthday",
      "Quinceañera",
      "Anniversary",
      "Baby Shower",
      "Bridal Shower",
      "Graduation",
      "Holiday Event",
      "Corporate Celebration",
      "Other",
    ],
  },
  {
    id: "guestCount",
    title: "Approximately how many guests?",
    type: "single",
    options: ["Under 20", "20–50", "50–100", "100–200", "200+"],
  },
  {
    id: "servicesNeeded",
    title: "What services are you interested in?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: [
      "Custom Cake",
      "Dessert Table",
      "Pastries",
      "Artisan Breads",
      "Dessert Catering",
      "Full Dessert Experience",
    ],
  },
  {
    id: "dietary",
    title: "Any dietary preferences or restrictions?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: dietaryOptions,
  },
  {
    id: "budget",
    title: "Estimated event budget?",
    type: "single",
    options: ["Under $300", "$300–$750", "$750–$1,500", "$1,500–$3,000", "$3,000+"],
  },
];

export const corporateQuestions: Question[] = [
  {
    id: "organizationType",
    title: "What type of organization are you representing?",
    type: "single",
    options: [
      "Airline",
      "Law Firm",
      "Medical Office",
      "Real Estate Office",
      "Luxury Retail",
      "Corporate Office",
      "Hotel",
      "Event Venue",
      "Event Planner",
      "Country Club",
      "Private Aviation Company",
      "Yacht Club",
      "School or University",
      "Other",
    ],
  },
  {
    id: "corporateInterest",
    title: "What are you interested in?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: [
      "Client Gifts",
      "Executive Gifts",
      "VIP Guest Amenities",
      "Meeting Catering",
      "Corporate Breakfasts",
      "Bagel Service",
      "Breakfast Boxes",
      "Bagel & Pastry Platters",
      "Coffee Service",
      "Dessert Catering",
      "Special Events",
      "Holiday Gifts",
      "Employee Appreciation Events",
      "Lounge Hospitality Service",
      "Recurring Monthly Service",
      "Custom Branded Pastries",
    ],
  },
  {
    id: "frequency",
    title: "How often would you need service?",
    type: "single",
    options: ["One Time", "Monthly", "Weekly", "Multiple Times Per Month"],
  },
  {
    id: "dietary",
    title: "Any dietary preferences or restrictions?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: dietaryOptions,
  },
  {
    id: "monthlyBudget",
    title: "Estimated monthly budget?",
    type: "single",
    options: ["Under $500", "$500–$1,500", "$1,500–$3,000", "$3,000–$5,000", "$5,000+"],
  },
];

export const pastryQuestions: Question[] = [
  {
    id: "products",
    title: "Which products interest you most?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: [
      "French Pastries",
      "Croissants",
      "Bagels",
      "Cakes",
      "Tarts",
      "Macarons",
      "Artisan Breads",
      "Seasonal Collections",
      "Chef's Selection",
    ],
  },
  {
    id: "occasion",
    title: "Is this for:",
    type: "single",
    options: ["Personal Enjoyment", "Family Gathering", "Gift", "Office Event", "Special Occasion"],
  },
  {
    id: "dietary",
    title: "Any dietary preferences or restrictions?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: dietaryOptions,
  },
  {
    id: "orderSize",
    title: "Estimated order size?",
    type: "single",
    options: ["Under $50", "$50–$100", "$100–$250", "$250–$500", "$500+"],
  },
];

export const finalQuestions: Question[] = [
  {
    id: "heardFrom",
    title: "How did you hear about Elena's Bakehouse?",
    type: "single",
    options: [
      "Google",
      "Instagram",
      "Facebook",
      "Wedding Venue",
      "Event Planner",
      "Corporate Referral",
      "Friend or Family",
      "Returning Client",
    ],
  },
  {
    id: "deliveryArea",
    title: "Where do you need delivery?",
    type: "single",
    options: ["Viera", "Melbourne", "Palm Bay", "Miami", "Other"],
  },
  {
    id: "notes",
    title: "Tell us anything else we should know.",
    subtitle: "Event details, inspiration, delivery needs, flavors, dietary notes, or special requests.",
    type: "textarea",
  },
  {
    id: "contact",
    title: "Where should we send your consultation details?",
    type: "contact",
  },
];

export function getBranchQuestions(service?: string): Question[] {
  if (!service) return [];

  if (service === "Wedding Cake") {
    return weddingQuestions;
  }

  if (service === "Corporate Catering" || service === "Monthly Corporate Account") {
    return corporateQuestions;
  }

  if (
    service === "Private Event Catering" ||
    service === "Dessert Table" ||
    service === "Custom Celebration Cake" ||
    service === "Not Sure Yet"
  ) {
    return eventQuestions;
  }

  return pastryQuestions;
}
