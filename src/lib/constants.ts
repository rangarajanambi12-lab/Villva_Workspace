export const ROLES = [
  { id: "md", name: "Managing Director" },
  { id: "manager", name: "Sales Manager" },
  { id: "sales", name: "Sales Executive" },
  { id: "engineer", name: "Application Engineer" },
  { id: "plant", name: "Plant Team" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export const TAMIL_NADU_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
  "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Thoothukudi",
  "Vellore", "Viluppuram", "Virudunagar"
];

export const DESIGNATIONS = [
  "Manager", "Executive", "Supervisor", "Operator", 
  "Assistant Manager", "Team Lead", "Trainee", "Other"
];

export const DEPARTMENTS = [
  "Sales", "Purchase", "Operations", "Finance", 
  "HR", "Marketing", "Warehouse", "Administration", "Other"
];

export const OUTCOMES = [
  "Pump", "Valve", "Motor", "Others"
];

export const STATUSES = {
  ACTIVE: "active",
  COMPLETED: "completed",
  PENDING: "pending",
  MISSED: "missed"
} as const;
