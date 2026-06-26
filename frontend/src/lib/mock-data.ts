import { addDays, format, subDays } from "date-fns";

export const MOCK_USERS = [
  { id: "md", email: "md@villva.com", password: "123", role: "md", name: "Sarah Connor (MD)" },
  { id: "manager", email: "manager@villva.com", password: "123", role: "manager", name: "John Smith (Manager)" },
  { id: "sales", email: "sales@villva.com", password: "123", role: "sales", name: "Mike Johnson (Sales)" },
  { id: "engineer", email: "engineer@villva.com", password: "123", role: "engineer", name: "Anna Lee (App Eng)" },
  { id: "plant", email: "plant@villva.com", password: "123", role: "plant", name: "David Kim (Plant)" },
];

const today = new Date();

export const MOCK_CUSTOMERS = [
  {
    id: "CUST-001",
    sno: 1,
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    customer: "ABC Manufacturing",
    purpose: "Product Demo",
    location: "Chennai",
    status: "completed"
  },
  {
    id: "CUST-002",
    sno: 2,
    date: format(today, 'yyyy-MM-dd'),
    customer: "XYZ Industries",
    purpose: "Follow-up",
    location: "Coimbatore",
    status: "pending"
  },
  {
    id: "CUST-003",
    sno: 3,
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    customer: "Global Tech Solutions",
    purpose: "Initial Pitch",
    location: "Madurai",
    status: "active"
  },
  {
    id: "CUST-004",
    sno: 4,
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    customer: "Southern Motors",
    purpose: "Negotiation",
    location: "Salem",
    status: "missed"
  }
];

export const MOCK_REPORTS = [
  {
    id: "REP-001",
    taskId: "CUST-001",
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    customer: "ABC Manufacturing",
    personName: "Ramesh Kumar",
    mobile: "9876543210",
    email: "ramesh@abc.com",
    outcome: "Pump, Motor",
    district: "Chennai",
    industry: "Automotive",
    designation: "Manager",
    department: "Purchase",
    keyFactor: "Price",
    nextAction: "Send Quote",
    requirement: "Needs 5 HP pumps for new line.",
    image: null,
  }
];
