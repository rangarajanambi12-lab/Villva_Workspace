# PROJECT SUMMARY

The application is a **Flowtech ERP System** — a single-page web application designed for field sales teams to plan, track, and report customer visits and activities. It serves as a **Customer Activity Management (CAM)** tool that enables sales personnel to schedule weekly customer visits, record visit feedback with multi-person contact details, track monthly activity performance through KPIs, and export reports. All data is persisted locally using the browser's `localStorage`, making it an offline-capable, self-contained field tool. The system is branded for **Flowtech** (flowtech.in) and was developed by **VILLVA**.

---

# APPLICATION OVERVIEW

## What This Application Does

This is a **Customer Activity Management (CAM) and Visit Reporting** ERP system. It allows field sales representatives to:

- Enter and maintain a customer database with visit schedules
- Plan weekly customer visit activities mapped to a Monday–Saturday calendar
- Record detailed feedback and visit reports for each customer interaction (supporting up to 3 contact persons per visit)
- Track monthly performance through KPI dashboards showing completed, pending, and missed visits
- Generate and export reports in CSV and text formats
- View monthly CAM records with full data export and print capabilities

## Intended Users

- **Field Sales Representatives** — individuals who visit customers, collect feedback, and report visit outcomes
- **Sales Managers** (implied) — who may review reports and performance metrics

## Main Objective

To provide a lightweight, mobile-friendly tool for field sales teams to **plan, execute, track, and report customer visits** with structured feedback collection.

## Key Functions

- Customer data entry and management
- Weekly customer activity scheduling (Monday–Saturday calendar)
- Multi-person feedback/visit report collection (up to 3 contact persons)
- Visiting card image upload
- Monthly KPI tracking (Total, Completed, Pending, Missed)
- Weekly performance analytics and summary
- Report viewing, export (CSV/PDF/Text), and printing
- Monthly CAM record management with export and print
- Daily automatic report reset mechanism
- Persistent state via localStorage

---

# NAVIGATION STRUCTURE

```
Flowtech ERP System
├── Dashboard
│   ├── Monthly Stats (KPI Cards)
│   │   ├── Monthly Total
│   │   ├── Completed
│   │   ├── Pending
│   │   └── Missed
│   ├── Weekly CAM (Monday – Saturday)
│   │   ├── Month Selector
│   │   ├── Week Display
│   │   ├── Week 1 through Week 4+
│   │   └── Daily Customer Activity Cards
│   └── Summary Cards
│       ├── Weekly Summary
│       ├── Performance
│       └── Best Day
├── Data
│   ├── Customer List Table
│   └── Data Entry Actions (Add Row, Confirm & Save, Clear)
├── Reports
│   ├── Feedback Reports Table
│   └── Report Actions (Export CSV, Export PDF, Clear All Reports)
└── Monthly CAM
    ├── Monthly CAM Records Table
    └── CAM Actions (Export CSV, Export PDF, Print, Clear All)
```

---

# PAGES & SCREENS

## 1. Dashboard Page

### Purpose
The main landing page providing a monthly overview and weekly customer activity management interface.

### Visible Components
- **Page Header**: Title "Dashboard" with subtitle "Monthly Overview & Weekly Customer Activity"
- **Stats Grid**: 4 KPI stat boxes with sparkline SVG charts (Monthly Total, Completed, Pending, Missed)
- **Weekly CAM Card**: Calendar-like grid (3 columns × 2 rows = 6 day cards, Monday–Saturday) showing scheduled customer visits for the selected week
- **Month Selector Dropdown**: January through December
- **Week Display Badge**: Shows current week (Week 1–4+)
- **Week Navigation Buttons**: 5 circular buttons (1, 2, 3, 4, 4+) to switch between weeks
- **Summary Cards Row**: 3 cards — Weekly Summary, Performance (percentage), Best Day
- Each day card shows customer names with action buttons (Add, View, Delete, Done)

### User Actions
- Click KPI stat boxes to open Short Data Modal with filtered entries
- Select month from dropdown to change calendar view
- Click week navigation buttons (1–5) to switch between weeks
- Click "+ Add" on a customer item to open the Feedback Form modal
- Click "👁 View" on a customer item to view saved feedback details
- Click "✕ Delete" on a customer item to mark it as "Missed"
- Click "✓ Done" on a customer item to mark it as "Completed" and send to Reports

### Navigation Connections
- Links to Data page via sidebar
- Links to Reports page via sidebar
- Links to Monthly CAM page via sidebar
- Opens Feedback Form Modal (Add)
- Opens Feedback Details Modal (View)
- Opens Short Data Modal (KPI click)

---

## 2. Data Page

### Purpose
Allows users to add and manage customer information that feeds into the Weekly CAM calendar and Monthly CAM records.

### Visible Components
- **Page Header**: Title "Manage Data" with subtitle "Add and manage customer information"
- **Customer List Card**: Table with columns — S.No, Date, Customer, Purpose, Location
- **Action Buttons Card**: Contains Add Row, Confirm & Save, and Clear buttons

### User Actions
- Add new row to customer list table
- Enter customer data (Date, Customer Name, Purpose, Location)
- Confirm & Save data (saves to Dashboard & Monthly CAM)
- Clear all table data

### Navigation Connections
- Data flows to Dashboard (Weekly CAM calendar)
- Data flows to Monthly CAM records

---

## 3. Reports Page

### Purpose
View and export collected feedback data from completed customer visits.

### Visible Components
- **Page Header**: Title "Reports" with subtitle "View and export collected feedback data"
- **Feedback Reports Card**: Table with columns — Date, Customer, Person Name, Mobile, Email, Outcome, District, Actions
- **Empty State**: "No feedback data available yet" message when no data exists
- **Export/Action Buttons**: Export as CSV, Export as PDF, Clear All Reports

### User Actions
- View report details (👁 View button opens Feedback Details Modal)
- Export reports as CSV file
- Export reports as PDF (text file)
- Clear all reports (opens Clear Reports Modal with confirmation)

### Navigation Connections
- Opens Feedback Details Modal
- Opens Clear Reports Confirmation Modal

---

## 4. Monthly CAM Page

### Purpose
View and manage all monthly customer activity data saved from the Data module.

### Visible Components
- **Page Header**: Title "Monthly CAM" with subtitle "View and manage monthly customer activity data"
- **Monthly CAM Records Card Header**: Shows "Monthly CAM Records" title with total record count badge
- **Records Table**: S.No, Date, Customer, Purpose, Location
- **Empty State**: "No CAM data available yet. Save data from the Data module first."
- **Export/Action Buttons**: Export as CSV, Export as PDF, Print, Clear All

### User Actions
- View all monthly CAM records
- Export as CSV
- Export as PDF (text file)
- Print records (opens print dialog)
- Clear all CAM data (with confirmation)

### Navigation Connections
- Fed by Data page entries

---

## 5. Feedback Form Modal

### Purpose
Collect detailed visit feedback and contact information for a customer visit, supporting up to 3 contact persons.

### Visible Components
- **Modal Header**: "📝 Add Feedback / Visit Report"
- **Person 1 Form Fields** (primary, always visible)
- **Person 2 Section** (optional, expandable): "👥 Add Person 2 (Optional)" with toggle button
- **Person 3 Section** (optional, expandable): "👥 Add Person 3 (Optional)" with toggle button
- **Modal Footer**: Cancel, Clear (🗑️), Save buttons

### User Actions
- Fill in all feedback fields for Person 1
- Optionally add Person 2 and/or Person 3
- Upload visiting card image(s)
- Select outcome checkboxes (Pump, Valve, Motor, Others)
- Clear the form
- Cancel and close
- Save feedback

### Navigation Connections
- Triggered from Dashboard Weekly CAM (Add button) or Today Task (➕ button)
- On save, updates localStorage and refreshes Dashboard

---

## 6. Feedback Details Modal

### Purpose
Display a read-only view of saved feedback including all person details and uploaded images.

### Visible Components
- **Modal Header**: "👁️ Feedback Details"
- **Details Grid**: All feedback fields rendered in labeled cards (Date, Customer, Address, District, Industry, Person Name, Designation, Department, Mobile, Email, Outcome, Key Factor, Next Action)
- **Requirement/Remarks section**
- **Visiting Card Image** (if uploaded)
- **Person 2 Details** section (if data exists)
- **Person 3 Details** section (if data exists)
- **Modal Footer**: Print (🖨️) and Close buttons

### User Actions
- View all feedback details
- Print feedback details
- Close modal

### Navigation Connections
- Triggered from Dashboard Weekly CAM (View button), Today Task (👁️ button), or Reports (👁 View button)

---

## 7. Short Data Modal

### Purpose
Quick-view popup showing filtered entry lists when clicking on dashboard KPI stat boxes.

### Visible Components
- **Modal Header**: Dynamic title (e.g., "Monthly Overview - All Entries", "Completed Entries", "Pending Entries", "Missed Entries")
- **Close Button** (✕)
- **Data Table**: S.No, Date, Customer, Location
- **Empty State**: "No data available"

### User Actions
- View filtered list of entries
- Close modal (button or click outside)

### Navigation Connections
- Triggered by clicking any of the 4 KPI stat boxes on the Dashboard

---

## 8. Clear Reports Confirmation Modal

### Purpose
Confirmation dialog with safety checkbox before permanently deleting all feedback reports.

### Visible Components
- **Warning Header**: "⚠️ Clear All Reports"
- **Warning Message**: "This action will permanently delete ALL feedback reports. This cannot be undone."
- **Confirmation Checkbox**: "Yes, I want to delete all reports permanently"
- **Cancel Button**
- **Delete All Button** (disabled until checkbox is checked)

### User Actions
- Check confirmation checkbox to enable Delete button
- Cancel and close
- Confirm deletion

### Navigation Connections
- Triggered from Reports page "Clear All Reports" button

---

## 9. Toast Notification

### Purpose
Ephemeral notification messages that appear at the bottom-right of the screen.

### Visible Components
- Toast message container with left border accent

### User Actions
- None (auto-dismisses after 3 seconds)

---

# DASHBOARDS

## Main Dashboard

| Property | Details |
|---|---|
| **Dashboard Name** | Dashboard |
| **KPIs** | Monthly Total, Completed, Pending, Missed |
| **Cards** | 4 KPI Stat Boxes (with sparkline charts), Weekly Summary Card, Performance Card, Best Day Card |
| **Charts** | 4 SVG sparkline polyline charts (one per KPI stat box) with draw animation |
| **Tables** | None directly; data displayed as day cards in the Weekly CAM grid |
| **Filters** | Month Selector (January–December dropdown), Week Navigation (Week 1–4+) |
| **Actions** | Click KPI boxes for drill-down modal, Add/View/Delete/Complete customer activities, Switch weeks, Change months |

### KPI Stat Boxes

| KPI | ID | Description | Chart Color |
|---|---|---|---|
| Monthly Total | `monthlyTotal` | All entries this month | Blue (#2d5aa0) |
| Completed | `completedCount` | With feedback submitted | Green (#4caf50) |
| Pending | `pendingCount` | Awaiting feedback | Orange (#ffb347) |
| Missed | `missedCount` | Not contacted | Pink (#ff6b9d) |

### Summary Cards

| Card | ID | Description |
|---|---|---|
| Weekly Summary | `weeklySummaryText` | Shows "+X Completed • Y Pending • Z Missed" for current week |
| Performance | `performanceText` | Percentage of activities completed this week |
| Best Day | `bestDayText` / `bestDayCountText` | Day with most completed activities and count |

---

# MODULES

## 1. Customer Data Management Module

### Purpose
Manage the master customer database used to populate the Weekly CAM calendar.

### Features
- Add customer records with date, name, purpose, and location
- Dynamic row addition to input table
- Auto serial-number assignment
- Bulk save to localStorage and Monthly CAM store
- Clear all input data

### Available Actions
- ➕ Add Row
- ✔ Confirm & Save
- 🗑️ Clear

### Related Components
- Data Page, Customer List Table, Dashboard Weekly CAM

---

## 2. Weekly CAM (Customer Activity Management) Module

### Purpose
Plan and track daily customer visit activities on a weekly calendar (Monday–Saturday).

### Features
- 6-day calendar grid (Monday–Saturday) with color-coded day cards
- Month selector (January–December)
- 5-week navigation (Week 1 through Week 4+)
- Customer items with action buttons per day
- Person count badges (numbered circles) on customer items showing how many contact persons have feedback
- Persistent month/week selection saved to localStorage

### Available Actions
- ➕ Add Feedback (opens Feedback Form Modal)
- 👁 View Feedback (opens Feedback Details Modal)
- ✕ Delete / Mark as Missed
- ✓ Done / Mark as Complete (moves to Reports)
- Switch weeks (1–5)
- Change month

### Related Components
- Dashboard Page, Feedback Form Modal, Feedback Details Modal, Reports Module

---

## 3. Feedback Collection Module

### Purpose
Collect structured visit feedback with support for multiple contact persons per customer visit.

### Features
- Comprehensive feedback form with person details
- Multi-person support (up to 3 persons per visit)
- Product outcome checkboxes (Pump, Valve, Motor, Others)
- Visiting card image upload (.jpg, .jpeg, .png, .pdf)
- Form validation (required fields, email format, 10-digit mobile)
- Data storage in multiple localStorage stores (weeklyFeedback, multiPerson)
- Auto-populated fields (S.No, Date, Customer Name)

### Available Actions
- Fill form fields
- Add Person 2 (optional)
- Add Person 3 (optional)
- Remove Person 2 / Person 3
- Upload visiting card image
- Clear form
- Cancel
- Save feedback

### Related Components
- Feedback Form Modal, Weekly CAM, Today Task

---

## 4. Reports Module

### Purpose
View, export, and manage collected feedback reports.

### Features
- Tabular view of all feedback entries
- View detailed feedback (including multi-person data and images)
- Export to CSV with all fields
- Export to text file (PDF-like format)
- Print reports with formatted table layout
- Slice export (export specific ranges)
- Clear all reports with checkbox confirmation safety

### Available Actions
- 👁 View report details
- 📥 Export as CSV
- 📄 Export as PDF (text)
- 🗑️ Clear All Reports

### Related Components
- Reports Page, Feedback Details Modal, Clear Reports Modal

---

## 5. Monthly CAM Records Module

### Purpose
Maintain a persistent record of all customer activities entered through the Data module.

### Features
- Tabular view of all monthly records (S.No, Date, Customer, Purpose, Location)
- Total record count display
- CSV export
- Text file export (PDF-like)
- Print functionality
- Clear all data with confirmation

### Available Actions
- 📥 Export as CSV
- 📄 Export as PDF
- 🖨️ Print
- 🗑️ Clear All

### Related Components
- Monthly CAM Page, Data Module

---

## 6. Data Persistence Module

### Purpose
Manage all application state through browser localStorage.

### Features
- 7 localStorage keys: `erpData`, `todayTask`, `reports`, `monthlyCam`, `weeklyFeedback`, `multiPerson`, `lastResetDate`
- 2 session keys: `selectedWeeklyCamMonth`, `selectedWeeklyCamWeek`
- Automatic daily reset of reports store (checks `lastResetDate`)
- JSON serialization/deserialization

### Available Actions
- Automatic load on page initialization
- Save on data changes
- Auto-reset daily

### Related Components
- All modules

---

# FORMS

## 1. Feedback / Visit Report Form (Person 1 — Primary)

| Property | Details |
|---|---|
| **Form Name** | Add Feedback / Visit Report |
| **Location** | Feedback Form Modal |

### Input Fields

| Field | ID | Type | Behavior |
|---|---|---|---|
| S.No | `feedbackSNo` | Text | Read-only, auto-populated |
| Date of Visit | `feedbackDate` | Date | Auto-populated with today's date |
| Customer Name | `feedbackCustomer` | Text | Read-only, auto-populated |
| Address | `feedbackAddress` | Text | Placeholder "Enter address" |
| Type of Industry | `feedbackIndustry` | Text | Placeholder "Enter industry" |
| Person Name | `feedbackPersonName` | Text | Placeholder "Enter name" |
| Mobile Number | `feedbackMobile` | Tel | Placeholder "10 digit number" |
| Mail ID | `feedbackEmail` | Email | Placeholder "Enter email" |
| Key Factor | `feedbackKeyFactor` | Text | Placeholder "Enter key factor" |
| Next Action | `feedbackNextAction` | Text | Placeholder "Enter next action" |

### Dropdowns

| Field | ID | Options |
|---|---|---|
| District | `feedbackDistrict` | 32 Tamil Nadu districts: Ariyalur, Chengalpattu, Chennai, Coimbatore, Cuddalore, Dharmapuri, Dindigul, Erode, Kallakurichi, Kanchipuram, Kanyakumari, Karur, Krishnagiri, Madurai, Mayiladuthurai, Nagapattinam, Namakkal, Nilgiris, Perambalur, Pudukkottai, Ramanathapuram, Ranipet, Salem, Sivaganga, Tirupathur, Tiruppur, Tiruvallur, Tiruvannamalai, Tiruvarur, Thoothukudi, Vellore, Viluppuram, Virudunagar |
| Designation | `feedbackDesignation` | Manager, Executive, Supervisor, Operator, Assistant Manager, Team Lead, Trainee, Other |
| Department | `feedbackDepartment` | Sales, Purchase, Operations, Finance, HR, Marketing, Warehouse, Administration, Other |

### Checkboxes

| Group | ID | Options |
|---|---|---|
| Outcome | `outcome_pump`, `outcome_valve`, `outcome_motor`, `outcome_others` | Pump, Valve, Motor, Others |

### Textarea

| Field | ID | Placeholder |
|---|---|---|
| Remarks | `feedbackRequirement` | "Enter remarks" |

### File Upload

| Field | ID | Accepted Types |
|---|---|---|
| Upload Visiting Card | `feedbackImage` | .jpg, .jpeg, .png, .pdf |

### Buttons

| Button | Style | Action |
|---|---|---|
| Cancel | `btn-secondary` | `closeFeedbackForm()` |
| 🗑️ Clear | `btn-warning` | `clearFeedbackForm()` |
| Save | `btn-primary` | `saveFeedback()` |

### Validation Messages (Toast Notifications)

- "⚠️ Please fill all required fields (including Outcome)"
- "⚠️ Invalid email format"
- "⚠️ Mobile must be 10 digits"
- "✅ Feedback saved successfully!"
- "✅ Form cleared successfully!"

---

## 2. Person 2 Form (Optional Extension)

| Property | Details |
|---|---|
| **Form Name** | Add Person 2 (Optional) |
| **Toggle** | "➕ Add Person 2" / "❌ Remove Person 2" |

### Input Fields

| Field | ID | Type |
|---|---|---|
| Person 2 Name | `feedbackPersonName2` | Text |
| Mobile Number | `feedbackMobile2` | Tel |
| Mail ID | `feedbackEmail2` | Email |
| Key Factor | `feedbackKeyFactor2` | Text |
| Next Action | `feedbackNextAction2` | Text |

### Dropdowns

| Field | ID | Same options as Person 1 |
|---|---|---|
| Designation | `feedbackDesignation2` | Yes |
| Department | `feedbackDepartment2` | Yes |

### Checkboxes

| Group | IDs | Options |
|---|---|---|
| Outcome | `outcome_pump2`, `outcome_valve2`, `outcome_motor2`, `outcome_others2` | Pump, Valve, Motor, Others |

### Textarea

| Field | ID |
|---|---|
| Remarks | `feedbackRequirement2` |

### File Upload

| Field | ID |
|---|---|
| Upload Visiting Card | `feedbackImage2` |

---

## 3. Person 3 Form (Optional Extension)

| Property | Details |
|---|---|
| **Form Name** | Add Person 3 (Optional) |
| **Toggle** | "➕ Add Person 3" / "❌ Remove Person 3" |

### Input Fields

| Field | ID | Type |
|---|---|---|
| Person 3 Name | `feedbackPersonName3` | Text |
| Mobile Number | `feedbackMobile3` | Tel |
| Mail ID | `feedbackEmail3` | Email |
| Key Factor | `feedbackKeyFactor3` | Text |
| Next Action | `feedbackNextAction3` | Text |

### Dropdowns

| Field | ID | Same options as Person 1 |
|---|---|---|
| Designation | `feedbackDesignation3` | Yes |
| Department | `feedbackDepartment3` | Yes |

### Checkboxes

| Group | IDs | Options |
|---|---|---|
| Outcome | `outcome_pump3`, `outcome_valve3`, `outcome_motor3`, `outcome_others3` | Pump, Valve, Motor, Others |

### Textarea

| Field | ID |
|---|---|
| Remarks | `feedbackRequirement3` |

### File Upload

| Field | ID |
|---|---|
| Upload Visiting Card | `feedbackImage3` |

---

## 4. Data Entry Form (Inline Table)

| Property | Details |
|---|---|
| **Form Name** | Customer Data Entry |
| **Location** | Data Page — Customer List Table |

### Input Fields (per row)

| Field | Type |
|---|---|
| S.No | Auto-generated (read-only) |
| Date | Date picker |
| Customer | Text input |
| Purpose | Text input |
| Location | Text input |

### Buttons

| Button | Style | Action |
|---|---|---|
| ➕ Add Row | `btn-primary` | `addRow()` |
| ✔ Confirm & Save | `btn-secondary` | `triggerData()` |
| 🗑️ Clear | `btn-danger` | `clearAllTableData()` |

---

## 5. Clear Reports Confirmation Form

| Property | Details |
|---|---|
| **Form Name** | Clear All Reports Confirmation |
| **Location** | Clear Reports Modal |

### Checkboxes

| Field | ID | Label |
|---|---|---|
| Confirmation | `clearConfirmCheck` | "Yes, I want to delete all reports permanently" |

### Buttons

| Button | Style | Action | State |
|---|---|---|---|
| Cancel | `btn-secondary` | `closeClearReportsModal()` | Always enabled |
| Delete All | `btn-danger` | `confirmClearReports()` | Disabled until checkbox is checked |

---

# TABLES

## 1. Customer List Table (Data Page)

| Property | Details |
|---|---|
| **Table Name** | Customer List |
| **Location** | Data Page |
| **Columns** | S.No, Date, Customer, Purpose, Location |
| **Filters** | None |
| **Search Features** | None |
| **Sorting Options** | None |
| **Export Options** | None (data saved via "Confirm & Save") |

---

## 2. Feedback Reports Table (Reports Page)

| Property | Details |
|---|---|
| **Table Name** | Feedback Reports |
| **Location** | Reports Page |
| **Columns** | Date, Customer, Person Name, Mobile, Email, Outcome, District, Actions |
| **Filters** | None |
| **Search Features** | None |
| **Sorting Options** | None |
| **Export Options** | Export as CSV, Export as PDF (text), Print |
| **Row Actions** | 👁 View (opens Feedback Details Modal) |

---

## 3. Monthly CAM Records Table (Monthly CAM Page)

| Property | Details |
|---|---|
| **Table Name** | Monthly CAM Records |
| **Location** | Monthly CAM Page |
| **Columns** | S.No, Date, Customer, Purpose, Location |
| **Filters** | None |
| **Search Features** | None |
| **Sorting Options** | None |
| **Export Options** | Export as CSV, Export as PDF (text), Print |

---

## 4. Short Data Modal Table

| Property | Details |
|---|---|
| **Table Name** | Short Data (Dynamic Title) |
| **Location** | Short Data Modal |
| **Columns** | S.No, Date, Customer, Location |
| **Filters** | Pre-filtered by type: Overall, Completed, Pending, Missed |
| **Search Features** | None |
| **Sorting Options** | None |
| **Export Options** | None |

---

# KPI & ANALYTICS

## KPI Card: Monthly Total

| Property | Details |
|---|---|
| **KPI Name** | Monthly Total |
| **Displayed Value** | Dynamic count (default: 0) |
| **Related Metrics** | "All entries this month" |
| **Sparkline Chart** | Blue (#2d5aa0) polyline |
| **Related Actions** | Click to open Short Data Modal filtered by "overall" |

## KPI Card: Completed

| Property | Details |
|---|---|
| **KPI Name** | Completed |
| **Displayed Value** | Dynamic count (default: 0) |
| **Related Metrics** | "With feedback submitted" |
| **Sparkline Chart** | Green (#4caf50) polyline |
| **Related Actions** | Click to open Short Data Modal filtered by "completed" |

## KPI Card: Pending

| Property | Details |
|---|---|
| **KPI Name** | Pending |
| **Displayed Value** | Dynamic count (default: 0) |
| **Related Metrics** | "Awaiting feedback" |
| **Sparkline Chart** | Orange (#ffb347) polyline |
| **Related Actions** | Click to open Short Data Modal filtered by "pending" |

## KPI Card: Missed

| Property | Details |
|---|---|
| **KPI Name** | Missed |
| **Displayed Value** | Dynamic count (default: 0) |
| **Related Metrics** | "Not contacted" |
| **Sparkline Chart** | Pink (#ff6b9d) polyline |
| **Related Actions** | Click to open Short Data Modal filtered by "missed" |

## Analytics Card: Weekly Summary

| Property | Details |
|---|---|
| **Name** | Weekly Summary |
| **Icon** | 📋 |
| **Displayed Value** | "+X Completed • Y Pending • Z Missed" |
| **Calculation** | Counts from current week's records |

## Analytics Card: Performance

| Property | Details |
|---|---|
| **Name** | Performance |
| **Icon** | ⭐ |
| **Displayed Value** | Percentage (e.g., "0%") |
| **Sub-text** | "% of activities completed this week" |
| **Calculation** | (Completed / Total) × 100, rounded |

## Analytics Card: Best Day

| Property | Details |
|---|---|
| **Name** | Best Day |
| **Icon** | ⭐ |
| **Displayed Value** | Day name (e.g., "Monday") or "-" |
| **Sub-text** | "X Activities Completed" |
| **Calculation** | Day with highest number of completed activities in current week |

---

# USER INTERACTIONS

## Data Entry Actions

| Action | Location | Description |
|---|---|---|
| **Add Row** | Data Page | Adds a new editable row to the customer list table |
| **Confirm & Save** | Data Page | Saves all table data to localStorage and Monthly CAM store |
| **Clear Table** | Data Page | Removes all rows from the data entry table (with confirmation) |

## Weekly CAM Actions

| Action | Location | Description |
|---|---|---|
| **Add Feedback** | Dashboard Weekly CAM | Opens feedback form modal pre-filled with customer/date |
| **View Feedback** | Dashboard Weekly CAM | Opens feedback details modal for saved feedback |
| **Mark as Missed** | Dashboard Weekly CAM | Marks a customer activity as "missed" |
| **Mark as Complete** | Dashboard Weekly CAM | Marks as "completed" and moves feedback to Reports |
| **Switch Week** | Dashboard Weekly CAM | Navigates between weeks 1–5 |
| **Change Month** | Dashboard Weekly CAM | Changes calendar to selected month |

## Feedback Form Actions

| Action | Location | Description |
|---|---|---|
| **Save Feedback** | Feedback Form Modal | Validates and saves feedback to localStorage |
| **Clear Form** | Feedback Form Modal | Resets all form fields |
| **Cancel** | Feedback Form Modal | Closes modal without saving |
| **Add Person 2** | Feedback Form Modal | Expands Person 2 form section |
| **Remove Person 2** | Feedback Form Modal | Collapses and clears Person 2 section |
| **Add Person 3** | Feedback Form Modal | Expands Person 3 form section |
| **Remove Person 3** | Feedback Form Modal | Collapses and clears Person 3 section |
| **Upload Image** | Feedback Form Modal | Uploads visiting card image (up to 3 per form) |

## Report Actions

| Action | Location | Description |
|---|---|---|
| **View Details** | Reports Page | Opens Feedback Details Modal for selected report |
| **Export CSV** | Reports Page | Downloads all reports as CSV file |
| **Export PDF** | Reports Page | Downloads all reports as text file |
| **Clear All Reports** | Reports Page | Opens confirmation modal to delete all reports |
| **Print** | Feedback Details Modal | Opens browser print dialog for feedback details |

## Monthly CAM Actions

| Action | Location | Description |
|---|---|---|
| **Export CSV** | Monthly CAM Page | Downloads all CAM records as CSV |
| **Export PDF** | Monthly CAM Page | Downloads all CAM records as text file |
| **Print** | Monthly CAM Page | Opens browser print dialog for CAM records |
| **Clear All** | Monthly CAM Page | Deletes all CAM data (with confirmation) |

## KPI Actions

| Action | Location | Description |
|---|---|---|
| **Click KPI Box** | Dashboard | Opens Short Data Modal filtered by the KPI type |

## General Actions

| Action | Location | Description |
|---|---|---|
| **Toggle Sidebar** | Mobile view | Opens/closes sidebar navigation on small screens |
| **Navigate Pages** | Sidebar | Switches between Dashboard, Data, Reports, Monthly CAM |

---

# WORKFLOWS

## Workflow 1: Customer Data Entry → Weekly CAM

```
Navigate to Data Page
↓
Click "➕ Add Row"
↓
Enter Date, Customer, Purpose, Location
↓
Click "✔ Confirm & Save"
↓
Data saved to Dashboard & Monthly CAM
↓
Navigate to Dashboard
↓
Customer appears in Weekly CAM calendar on the entered date
```

## Workflow 2: Customer Visit Feedback Collection

```
View customer on Weekly CAM calendar
↓
Click "+ Add" on customer item
↓
Feedback Form Modal opens (pre-filled with S.No, Date, Customer)
↓
Fill in Address, District, Industry, Person Name, Designation, Department, Mobile, Email
↓
Select Outcome checkboxes (Pump/Valve/Motor/Others)
↓
Enter Key Factor, Next Action, Remarks
↓
(Optional) Upload Visiting Card image
↓
(Optional) Click "➕ Add Person 2" → Fill Person 2 details
↓
(Optional) Click "➕ Add Person 3" → Fill Person 3 details
↓
Click "Save"
↓
Feedback saved to localStorage
↓
Toast notification: "✅ Feedback saved successfully!"
```

## Workflow 3: Complete Activity → Move to Reports

```
Feedback saved for a customer (via Workflow 2)
↓
Click "✓ Done" on customer item in Weekly CAM
↓
System checks if feedback exists
↓
If no feedback → Toast: "⚠️ Please save feedback first"
If feedback exists →
  ↓
  Feedback moved to Reports store
  ↓
  Customer status updated to "completed"
  ↓
  Customer removed from active Weekly CAM view
  ↓
  Dashboard KPIs updated
  ↓
  Toast: "✅ Marked as Completed & Sent to Reports!"
```

## Workflow 4: Mark Customer as Missed

```
View customer on Weekly CAM calendar
↓
Click "✕ Delete" on customer item
↓
Customer status updated to "missed"
↓
Customer removed from active Weekly CAM view
↓
Dashboard "Missed" KPI incremented
↓
Toast: "✅ Marked as Missed!"
```

## Workflow 5: View & Export Reports

```
Navigate to Reports page
↓
View Feedback Reports table
↓
(Optional) Click "👁 View" to see full details in modal
↓
(Optional) Click "🖨️ Print" in details modal to print
↓
Click "📥 Export as CSV" → CSV file downloaded
OR Click "📄 Export as PDF" → Text file downloaded
```

## Workflow 6: Clear All Reports (with Safety Confirmation)

```
Navigate to Reports page
↓
Click "🗑️ Clear All Reports"
↓
Clear Reports Modal opens
↓
Check "Yes, I want to delete all reports permanently"
↓
"Delete All" button becomes enabled
↓
Click "Delete All"
↓
All reports and weekly feedback cleared from localStorage
↓
Reports page refreshed
↓
Toast: "✅ All reports cleared successfully"
```

## Workflow 7: KPI Drill-Down

```
View Dashboard KPI stat boxes
↓
Click on any KPI box (Monthly Total / Completed / Pending / Missed)
↓
Short Data Modal opens with filtered entries
↓
View S.No, Date, Customer, Location for filtered records
↓
Click "✕" or click outside to close
```

## Workflow 8: Daily Auto-Reset

```
Application loads
↓
System checks lastResetDate vs today's date
↓
If different day → Reports store is automatically cleared
↓
lastResetDate updated to today
```

---

# ROLE VISIBILITY

No explicit user roles, authentication, or role-based access control are present in the HTML. The application operates as a single-user tool without login, permissions, or role differentiation. All features are accessible to any user who opens the application.

---

# UI COMPONENT INVENTORY

## Menus

| Component | Description |
|---|---|
| Sidebar Navigation | Fixed left sidebar with 4 navigation links (Dashboard, Data, Reports, Monthly CAM) |
| Mobile Menu Toggle | Hamburger button (☰) for mobile sidebar toggle |

## Cards

| Component | Count | Description |
|---|---|---|
| KPI Stat Boxes | 4 | Monthly Total, Completed, Pending, Missed — with sparkline charts |
| Weekly CAM Card | 1 | Contains 6-day calendar grid with week navigation |
| Weekly Summary Card | 1 | Completed/Pending/Missed count summary |
| Performance Card | 1 | Completion percentage |
| Best Day Card | 1 | Day with most completions |
| Customer List Card | 1 | Data entry table wrapper |
| Feedback Reports Card | 1 | Reports table wrapper |
| Monthly CAM Records Card | 1 | CAM records table wrapper |
| Day Cards | 6 per week | Color-coded Monday–Saturday cards in Weekly CAM |
| Customer Items | Variable | Individual customer entries within day cards |

## Charts

| Component | Description |
|---|---|
| SVG Sparkline Charts | 4 animated polyline charts in KPI stat boxes |

## Widgets

| Component | Description |
|---|---|
| Month Selector Dropdown | Select month (January–December) in Weekly CAM |
| Week Display Badge | Shows "Week 1" through "Week 4+" |
| Record Count Badge | Shows total records in Monthly CAM |
| Task Count Display | Shows task count status (not in current page view) |
| Person Count Badges | Numbered circular badges (1, 2, 3) on customer items |

## Forms

| Component | Count |
|---|---|
| Feedback Form (Person 1) | 1 |
| Feedback Form (Person 2) | 1 (expandable) |
| Feedback Form (Person 3) | 1 (expandable) |
| Data Entry Inline Form | 1 |
| Clear Reports Confirmation | 1 |

## Tables

| Component | Count |
|---|---|
| Customer List Table | 1 |
| Feedback Reports Table | 1 |
| Monthly CAM Records Table | 1 |
| Short Data Modal Table | 1 |

## Buttons

| Style Class | Usage |
|---|---|
| `btn-primary` | Save, Export CSV, Add Row |
| `btn-secondary` | Cancel, Confirm & Save |
| `btn-danger` | Delete, Clear, Remove Person |
| `btn-info` | View, Export PDF |
| `btn-warning` | Add Feedback (➕), Print, Clear Form |
| `btn-success` | Mark Complete (✓) |
| `btn-add` | "+ Add" in day cards |
| `btn-view` | "👁 View" in day cards |
| `btn-delete` | "✕ Delete" in day cards |
| `btn-complete` | "✓ Done" in day cards |
| `week-nav-btn` | Week navigation (1, 2, 3, 4, 4+) |

## Filters

| Component | Description |
|---|---|
| Month Selector | Dropdown to filter Weekly CAM by month |
| Week Navigation | Buttons to filter by week number |
| KPI Click Filters | Stat box clicks filter Short Data Modal by status |

## Popups / Modals

| Component | ID | Type |
|---|---|---|
| Feedback Form Modal | `feedbackModal` | Full-screen overlay modal |
| Feedback Details Modal | `feedbackDetailsModal` | Full-screen overlay modal |
| Short Data Modal | `shortDataModal` | Full-screen overlay modal |
| Clear Reports Modal | `clearReportsModal` | Full-screen overlay modal |

## Notifications

| Component | ID | Behavior |
|---|---|---|
| Toast Notification | `toast` | Bottom-right, auto-dismiss after 3 seconds |

## Tabs

No tab components are present in the application.

---

# CONTENT HIERARCHY

```
Flowtech ERP System
├── Sidebar
│   ├── Flowtech Logo
│   ├── Dashboard (Navigation Link)
│   ├── Data (Navigation Link)
│   ├── Reports (Navigation Link)
│   └── Monthly CAM (Navigation Link)
├── Main Content
│   ├── Dashboard Page
│   │   ├── Page Header ("Dashboard")
│   │   ├── Monthly Stats Grid
│   │   │   ├── Monthly Total KPI Box + Sparkline
│   │   │   ├── Completed KPI Box + Sparkline
│   │   │   ├── Pending KPI Box + Sparkline
│   │   │   └── Missed KPI Box + Sparkline
│   │   ├── Weekly CAM Card
│   │   │   ├── Card Header
│   │   │   │   ├── Title: "Weekly CAM (Monday - Saturday)"
│   │   │   │   ├── Month Selector Dropdown
│   │   │   │   └── Week Display Badge
│   │   │   ├── Card Body
│   │   │   │   ├── Weekly CAM Grid (3×2)
│   │   │   │   │   ├── Monday Card
│   │   │   │   │   │   ├── Date Header
│   │   │   │   │   │   ├── Day Label
│   │   │   │   │   │   └── Customer Items
│   │   │   │   │   │       ├── Customer Name + Person Badges
│   │   │   │   │   │       └── Action Buttons (Add, View, Delete, Done)
│   │   │   │   │   ├── Tuesday Card
│   │   │   │   │   ├── Wednesday Card
│   │   │   │   │   ├── Thursday Card
│   │   │   │   │   ├── Friday Card
│   │   │   │   │   └── Saturday Card
│   │   │   │   └── Week Navigation Buttons (1, 2, 3, 4, 4+)
│   │   │   └── (End of Card)
│   │   └── Summary Cards Row
│   │       ├── Weekly Summary Card (📋)
│   │       ├── Performance Card (⭐)
│   │       └── Best Day Card (⭐)
│   ├── Data Page
│   │   ├── Page Header ("Manage Data")
│   │   ├── Customer List Card
│   │   │   └── Table (S.No, Date, Customer, Purpose, Location)
│   │   └── Actions Card
│   │       ├── ➕ Add Row Button
│   │       ├── ✔ Confirm & Save Button
│   │       └── 🗑️ Clear Button
│   ├── Reports Page
│   │   ├── Page Header ("Reports")
│   │   └── Feedback Reports Card
│   │       ├── Reports Table (Date, Customer, Person Name, Mobile, Email, Outcome, District, Actions)
│   │       └── Actions Bar
│   │           ├── 📥 Export as CSV Button
│   │           ├── 📄 Export as PDF Button
│   │           └── 🗑️ Clear All Reports Button
│   └── Monthly CAM Page
│       ├── Page Header ("Monthly CAM")
│       └── Monthly CAM Records Card
│           ├── Header with Record Count Badge
│           ├── Records Table (S.No, Date, Customer, Purpose, Location)
│           └── Actions Bar
│               ├── 📥 Export as CSV Button
│               ├── 📄 Export as PDF Button
│               ├── 🖨️ Print Button
│               └── 🗑️ Clear All Button
├── Modals (Overlays)
│   ├── Feedback Form Modal
│   │   ├── Header: "📝 Add Feedback / Visit Report"
│   │   ├── Body
│   │   │   ├── Person 1 Fields (S.No, Date, Customer, Address, District, Industry, Person Name, Designation, Department, Mobile, Email, Outcome, Key Factor, Next Action, Remarks, Visiting Card Upload)
│   │   │   ├── Person 2 Section (Optional — Expandable)
│   │   │   │   └── Same fields as Person 1 (minus S.No, Date, Customer, Address, District, Industry)
│   │   │   └── Person 3 Section (Optional — Expandable)
│   │   │       └── Same fields as Person 2
│   │   └── Footer (Cancel, Clear, Save)
│   ├── Feedback Details Modal
│   │   ├── Header: "👁️ Feedback Details"
│   │   ├── Body
│   │   │   ├── Details Grid (Date, Customer, Address, District, Industry, Person Name, Designation, Department, Mobile, Email, Outcome, Key Factor, Next Action)
│   │   │   ├── Requirement Section
│   │   │   ├── Visiting Card Image (Person 1)
│   │   │   ├── Person 2 Details Section (if exists)
│   │   │   └── Person 3 Details Section (if exists)
│   │   └── Footer (Print, Close)
│   ├── Short Data Modal
│   │   ├── Header (Dynamic title + Close button)
│   │   └── Table (S.No, Date, Customer, Location)
│   └── Clear Reports Confirmation Modal
│       ├── Warning Header
│       ├── Warning Message
│       ├── Confirmation Checkbox
│       └── Buttons (Cancel, Delete All)
├── Toast Notification
└── Footer
    ├── "Developed by VILLVA"
    └── "© 2024 All Rights Reserved | Flowtech ERP System"
```

---

# COMPLETE APPLICATION BLUEPRINT

## System Identity

The **Flowtech ERP System** is a browser-based, single-page Customer Activity Management (CAM) application designed for the field sales team of **Flowtech** (flowtech.in). It was developed by **VILLVA** and is branded with the Flowtech logo. The system runs entirely in the browser with no server-side dependencies, using `localStorage` for data persistence.

## How the System Works

### Data Flow

The application follows a linear data flow:

1. **Data Entry** → A sales representative enters customer visit plans on the **Data** page, specifying the date, customer name, visit purpose, and location. Multiple rows can be added at once. Clicking "Confirm & Save" stores this data in both the primary data store and the Monthly CAM records.

2. **Weekly Calendar** → Saved entries automatically appear on the **Dashboard** in the **Weekly CAM** section, organized into a 6-day calendar (Monday through Saturday). The calendar is divided into up to 5 weeks per month, navigable via circular numbered buttons. A month selector dropdown allows viewing any month.

3. **Feedback Collection** → When a sales representative visits a customer, they click the "+ Add" button on the customer's entry in the weekly calendar. This opens a comprehensive **Feedback Form Modal** where they record:
   - Visit details (date, address, district, industry type)
   - Contact person information (name, designation, department, mobile, email)
   - Business outcomes (Pump, Valve, Motor, Others — as checkboxes)
   - Key factors and next actions
   - Remarks
   - Visiting card image upload
   
   The form uniquely supports **up to 3 contact persons per visit** — Person 1 is always visible, while Person 2 and Person 3 can be optionally expanded. Each additional person has their own set of fields for designation, department, outcome, key factor, next action, remarks, and visiting card upload.

4. **Activity Completion** → After saving feedback, the representative clicks "✓ Done" to mark the activity as completed. This moves the feedback to the **Reports** store and updates the dashboard KPIs. Alternatively, clicking "✕ Delete" marks the activity as "Missed."

5. **Reporting** → The **Reports** page displays all completed feedback entries in a table. Users can view full details (including multi-person data and images), export data as CSV or PDF (text format), and clear all reports through a safety-confirmed deletion process.

6. **Monthly Records** → The **Monthly CAM** page maintains a persistent record of all customer activities entered through the Data module, regardless of completion status. It provides export and print capabilities for record-keeping.

### Dashboard Intelligence

The dashboard provides real-time analytics:
- **4 KPI stat boxes** with animated sparkline charts showing Monthly Total, Completed, Pending, and Missed counts. Each is clickable for a drill-down view showing the actual entries.
- **3 summary cards** showing Weekly Summary (completed/pending/missed for the current week), Performance (completion percentage), and Best Day (day with most completions).

### Data Persistence

The system uses 7 localStorage keys:
- `erpData` — Master customer data
- `todayTask` — Today's task list
- `reports` — Completed feedback reports
- `monthlyCam` — Monthly CAM records
- `weeklyFeedback` — Feedback linked to weekly CAM entries
- `multiPerson` — Person 2 and Person 3 data keyed by feedback ID
- `lastResetDate` — Tracks daily auto-reset

An automatic daily reset mechanism clears the reports store when the application detects a new day, ensuring fresh daily tracking.

### Responsive Design

The application is fully responsive:
- **Desktop (>1024px)**: Full 250px sidebar + content area, 3-column weekly grid
- **Tablet (768–1024px)**: Narrower 200px sidebar, 2-column stats
- **Mobile (<768px)**: Hidden sidebar with hamburger toggle, stacked single-column layout, bottom-sheet modals
- **Small Mobile (<480px)**: Further compacted layout with hidden sparkline charts, full-width buttons

### Regional Context

The application is specifically tailored for operations in **Tamil Nadu, India**:
- District dropdown contains all 32 Tamil Nadu districts
- Date formatting uses Indian locale (`en-IN`)
- Currency and regional conventions follow Indian standards
- The product outcomes (Pump, Valve, Motor) indicate an industrial/manufacturing sales context

### Multi-Person Capability

A distinctive feature is the **multi-person feedback system**. For each customer visit, the application can capture contact details for up to 3 persons met during the visit. Person count badges (numbered blue circles) appear on the weekly calendar customer items, providing visual indication of how many contacts were recorded. The feedback details modal and reports display all person data with clear section separations.
