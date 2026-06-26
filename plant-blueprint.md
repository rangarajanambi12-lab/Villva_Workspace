# PROJECT SUMMARY

**Villva ERP – Plant Team Workspace** is a department-scoped operational dashboard built for the Plant Team at Flowtech. It gives the plant team a single browser-based screen to track active production jobs on the shop floor, plan and submit weekly work allocations (WAM), view team member contact details, and export operational reports. The application belongs to the Villva ERP product suite and is branded with the Villva logo and colour system.

---

# APPLICATION OVERVIEW

## What this application does
The application provides a real-time, single-page operational workspace for a manufacturing plant team. It consolidates four operational activities into one interface: shop-floor job tracking, weekly work-allocation planning, team directory lookup, and CSV report generation.

## Intended Users
- **Plant Team Engineers** – submit and manage their own weekly work plans (WAM entries) and monitor job statuses.
- **Plant Team Manager (Premnath)** – reviews all team members' work plans, updates job statuses, triggers WAM plans to the tracking board, and exports reports.

## Main Objective
To give the Flowtech Plant Team visibility over every production job in progress (assembly → testing → dispatch), ensure each team member's weekly tasks are planned and tracked, and surface bottlenecks or delayed jobs at a glance.

## Key Functions
1. Live dashboard KPIs and charts summarising shop-floor job health.
2. Plant Team Work Tracking table — one row per job/task, with per-row status management.
3. Work Allocation Matrix (WAM) — a weekly task-planning form that feeds into the tracking table.
4. Employee directory for the Plant Team.
5. CSV export of performance and WAM compliance reports.
6. Light / dark theme toggle.

---

# NAVIGATION STRUCTURE

```
Villva ERP – Plant Team Workspace
│
├── Dashboard                     (default landing screen)
│
├── Plant Team Tracking           (labelled "Plant Team Tracking" in nav; view id: scm)
│
├── My WAM                        (Work Allocation Matrix; view id: wam)
│   └── Submit Weekly Plan        (only sub-tab present)
│
├── Directory                     (view id: directory)
│
├── Reports                       (view id: reports)
│
└── Settings                      (view id: settings; placed at bottom of sidebar)
```

The sidebar collapses to icon-only width (80 px) by default and expands to full labels (260 px) on hover. On mobile (≤ 768 px) the sidebar is hidden off-screen and revealed via a hamburger button.

---

# PAGES & SCREENS

## Screen 1 — Dashboard

### Purpose
Gives an at-a-glance summary of the current shop-floor state: how many jobs are tracked, how many are done, pending, or stuck, and how planned work is distributed across team members this week.

### Visible Components
- 4 KPI cards (All Tracked Jobs, Jobs Done & Dispatched, In Progress / Pending, Stuck / Delayed)
- 2 chart cards:
  - "Current Shop Floor Status" — doughnut chart
  - "Plant Team WAM Hours (This Week)" — bar chart
- Sticky top header with page title, global search bar, user badge, and theme toggle

### User Actions
- Click any KPI card → navigates to Plant Team Tracking screen
- Switch theme (light / dark)
- Use global search bar (text input, placeholder: "Search tasks, jobs…")

### Navigation Connections
- All 4 KPI cards link to the Plant Team Tracking screen
- Sidebar links to all other screens

---

## Screen 2 — Plant Team Tracking

### Purpose
The primary operational log. Lists every production job or task assigned to the plant team, shows its current status as a colour-coded badge, and allows the manager or engineer to change the status directly from the table.

### Visible Components
- Table card titled "Production / Plant Team Work Tracking"
- "+" Add Entry" button (top right of card)
- Excel-style table with 7 columns: Week, Day, Employee, Task, Description, Status (badge), Change Status (dropdown)
- Status badges: Done (green), Completed (green), In Progress (amber), Pending (gray), Stuck (red), Need Support (red), Missed (red), Planned (blue)
- Change Status dropdown per row with options: Done, Pending, Stuck, Need Support

### Sample Data Loaded at Launch
| Job No. | Customer | Assembly | Testing | Dispatch | Target |
|---|---|---|---|---|---|
| FT-2291 | Salem Steel Plant | In Progress | Pending | Pending | 28 Jun 2026 |
| FT-2284 | Coromandel Engineering Works | Completed | Completed | In Progress | 19 Jun 2026 |
| FT-2270 | Hindustan Zinc Works | Completed | Completed | Completed | 05 Jun 2026 |
| FT-2265 | Tirupati Power Corp | Pending | Pending | Pending | 02 Jul 2026 |
| FT-2258 | Madras Fertilizers Ltd | In Progress | Pending | Pending | 15 Jun 2026 |
| FT-2247 | Neyveli Lignite Corp | Completed | In Progress | Pending | 22 Jun 2026 |

### User Actions
- Add new entry via "+ Add Entry" button (prompts for task name and employee name)
- Change job status using per-row dropdown (updates badge and dashboard KPIs/charts live)

### Navigation Connections
- Accessible from sidebar nav item "Plant Team Tracking"
- Accessible by clicking any Dashboard KPI card

---

## Screen 3 — My WAM (Work Allocation Matrix)

### Purpose
Allows team members to plan and submit their weekly tasks. The submitted entries are stored in the WAM list and can be "triggered" (pushed) into the Plant Team Tracking table.

### Visible Components
- Sub-tab bar with one active tab: "Submit Weekly Plan"
- **Card 1: Add My Weekly Task** — a data-entry form
- **Card 2: My Weekly Plan** — a read-only table of submitted WAM entries for the department
- Trigger button (below the WAM table)

### User Actions
- Fill and submit a WAM entry form
- Delete an existing WAM entry (✕ button per row)
- Click "Trigger" to push all department WAM entries into the Plant Team Tracking table

### Navigation Connections
- Accessible from sidebar nav item "My WAM"

---

## Screen 4 — Directory

### Purpose
Read-only contact list for all Plant Team employees.

### Visible Components
- Table card titled "Employee Master"
- 6-column table: Employee Name, Department, Designation, Reporting Manager, Email, Phone

### User Actions
- View-only. No add, edit, or delete actions present.

### Navigation Connections
- Accessible from sidebar nav item "Directory"

---

## Screen 5 — Reports

### Purpose
Provides one-click CSV export for two operational reports.

### Visible Components
- Section intro text: "Generate and export operational reports for the Plant Team. Exports download as CSV files ready for Excel."
- 2 report cards:
  1. **Plant Team Performance Report** — covers active jobs, completion rate, delayed dispatches
  2. **WAM Compliance Report** — covers weekly submission status and planned hours

### User Actions
- Export Plant Team Performance Report as CSV (`plant-team-performance.csv`)
- Export WAM Compliance Report as CSV (`plant-team-wam-report.csv`)

### Navigation Connections
- Accessible from sidebar nav item "Reports"

---

## Screen 6 — Settings

### Purpose
Displays the current user's role and permission level within the application. All fields are read-only (disabled inputs).

### Visible Components
- Card titled "Department Access"
- Two disabled text fields:
  - **Your Role**: Plant Team Engineer
  - **Permissions**: Can edit Plant Team Tracking and own WAM.

### User Actions
- View-only. No editable fields.

### Navigation Connections
- Accessible from the bottom sidebar nav item "Settings"

---

# DASHBOARDS

## Dashboard — Plant Team Workspace

**Dashboard Name:** Plant Team Dashboard (default landing screen)

### KPIs
| KPI Title | Sub-label | Colour Indicator |
|---|---|---|
| All Tracked Jobs | Total on shop floor | Neutral |
| Jobs Done & Dispatched | Completed successfully | Green (positive) |
| In Progress / Pending | Active in Assembly/Testing | Amber (warning) |
| Stuck / Delayed | Past target dispatch date | Amber (warning) |

All KPI values are computed dynamically from the job list. All 4 cards are clickable and navigate to the Plant Team Tracking screen.

### Charts

**Chart 1 — Current Shop Floor Status**
- Type: Doughnut chart
- Segments: Done (green), In Progress (amber), Pending (blue), Stuck / Need Support (red)
- Data source: Plant Team Tracking job list

**Chart 2 — Plant Team WAM Hours (This Week)**
- Type: Bar chart
- X-axis: Employee names
- Y-axis: Planned hours (falls back to planned task count per employee if no hours are recorded)
- Data source: WAM entries for the Plant Team department

### Filters
None on the dashboard itself. KPI card clicks act as navigation shortcuts.

### Actions
- Click KPI card → navigate to Plant Team Tracking
- Toggle theme (light/dark)
- Use global search bar

---

# MODULES

## Module 1 — Plant Team Work Tracking (SCM)

### Purpose
Central job log for the shop floor. Tracks every production job through its lifecycle (assembly, testing, dispatch) with a live-updated status column.

### Features
- Displays all jobs with week range, day, assigned employee, task name, description, and current status badge
- Colour-coded status badges (green, amber, gray, red, blue)
- Per-row inline status change via dropdown
- Dashboard KPIs and charts update immediately when a status is changed
- Quick-add via browser prompt dialog

### Available Actions
- **Add Entry** — opens a two-step browser prompt (task name, then employee name); adds a new row at the top of the table with the current week date range
- **Change Status** — per-row dropdown: Done / Pending / Stuck / Need Support
- Status change immediately refreshes the status badge, KPI counts, and charts

### Related Components
- Dashboard KPI cards (reflect SCM data)
- Dashboard doughnut chart (reflects SCM status distribution)
- WAM Trigger (pushes WAM entries into this table)
- Reports → Plant Team Performance Report (exports this table's data)

---

## Module 2 — Work Allocation Matrix (WAM)

### Purpose
Weekly task planning tool. Each team member (or manager on their behalf) submits planned tasks for the week. The WAM list acts as a staging area before tasks are formally pushed to the Plant Team Tracking table.

### Features
- Data-entry form with auto-populated current week dates and current weekday
- Employee dropdown populated from the employee master list
- Day selector (Monday – Saturday)
- Stores submitted entries scoped to the Plant Team department
- WAM table shows all department entries (not just the logged-in user's)
- "Trigger" action batch-copies WAM entries to the Plant Team Tracking table with status "Planned"

### Available Actions
- **Submit WAM Entry** — validates required fields (week dates + task name) and adds to the WAM list
- **Delete WAM Entry (✕)** — removes a specific row from the WAM list after a confirmation dialog
- **Trigger** — pushes all Plant Team WAM entries to the Plant Team Tracking table; requires confirmation; shows a success alert with entry count

### Related Components
- WAM table (My Weekly Plan)
- Plant Team Tracking table (receives triggered entries)
- Dashboard bar chart (reflects WAM entries per employee)
- Reports → WAM Compliance Report (exports WAM data)

---

## Module 3 — Employee Directory

### Purpose
Read-only reference of all Plant Team members — contact details and organisational hierarchy.

### Features
- Lists all 6 Plant Team employees
- Shows department, designation, reporting manager, email, and phone

### Available Actions
- View only. No CRUD actions available.

### Related Components
- WAM employee dropdown (populated from this employee list)

### Employee Records Displayed
| Name | Designation | Manager |
|---|---|---|
| Selvaraj | QA | Premnath |
| Sivakumar | Worker | Premnath |
| Rajesh | SCM | Premnath |
| ACS | Admin | Premnath |
| Gopinath | Worker | Premnath |
| Parthipan | Supervisor | Premnath |

---

## Module 4 — Reports

### Purpose
On-demand CSV export of two operational data sets.

### Features
- Two named report cards with descriptions
- One-click download to a `.csv` file (opens browser download prompt)

### Available Actions
- **Export Plant Team Performance Report** → downloads `plant-team-performance.csv`
- **Export WAM Compliance Report** → downloads `plant-team-wam-report.csv`

### Related Components
- Plant Team Tracking table (source for performance report)
- WAM entries (source for compliance report)

---

# FORMS

## Form 1 — Add My Weekly Task (WAM Entry Form)

**Location:** My WAM screen → "Add My Weekly Task" card

| Field | Type | Details |
|---|---|---|
| Week Start Date | Date input | Auto-filled with Monday of the current week (ISO format) |
| Week End Date | Date input | Auto-filled with Friday of the current week (ISO format) |
| Employee | Dropdown (select) | Populated from employee master; defaults to current user (Sneha Pillai) |
| Day | Dropdown (select) | Options: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday; defaults to current weekday |
| Task Name | Text input | Placeholder: "e.g. Assembly tracking" — required field |
| Description | Text input | Placeholder: "e.g. Assembly tracking" — optional |

**Buttons:**
- **Submit WAM Entry** (primary green button) — submits the form

**Validation:**
- Alert shown if Week Start Date, Week End Date, or Task Name is empty: "Week dates and task name are required."
- No other client-side validation messages are displayed.

**Post-Submit Behaviour:**
- Task Name and Description fields are cleared
- Day resets to the current weekday
- New entry appears at the top of the "My Weekly Plan" table

---

## Form 2 — Add SCM Entry (Prompt-based)

**Location:** Plant Team Tracking screen → "+ Add Entry" button

This is not a traditional form. It uses two sequential browser `prompt()` dialogs:

| Step | Prompt Text | Default Value |
|---|---|---|
| 1 | "Task name for entry?" | (blank) |
| 2 | "Employee name for entry?" | Sneha Pillai (currentUserName) |

- If the user cancels the task name prompt, no entry is added.
- The week dates are auto-calculated as the current week (Mon–Fri).

---

# TABLES

## Table 1 — Plant Team Tracking Table (SCM Table)

**Table ID:** `scm-table`
**Location:** Plant Team Tracking screen

| Column | Description |
|---|---|
| Week | Date range (e.g. "28 Jun 2026") or "weekStart – weekEnd" formatted in Indian locale |
| Day | Day of the week (e.g. Monday) |
| Employee | Name of assigned team member |
| Task | Task or job number |
| Description | Customer name or task description |
| Status | Colour-coded badge (read-only display) |
| Change Status | Inline dropdown to update the status |

**Status dropdown options per row:** (blank default), Done, Pending, Stuck, Need Support

**Filters:** None
**Search:** Global search bar in the header (input exists; filtering logic not implemented in the HTML)
**Sorting:** None
**Export:** Via Reports screen → Plant Team Performance Report (CSV)

---

## Table 2 — My Weekly Plan Table (WAM Table)

**Table ID:** `wam-table`
**Location:** My WAM screen → "My Weekly Plan" card

| Column | Description |
|---|---|
| Week | Formatted date range for the week |
| Day | Day of the week |
| Employee | Assigned employee name |
| Task | Planned task name |
| Description | Task description |
| Act | Delete button (✕) |

**Filters:** Shows only entries where `dept === 'Plant Team'`
**Search:** None
**Sorting:** Newest entries appear at the top (prepended on submit)
**Export:** Via Reports screen → WAM Compliance Report (CSV)

Empty state message: "No WAM entries submitted yet." (displayed when no department entries exist)

---

## Table 3 — Employee Directory Table

**Table ID:** `directory-table`
**Location:** Directory screen → "Employee Master" card

| Column | Description |
|---|---|
| Employee Name | Full name |
| Department | Department name (all "Plant Team" in current data) |
| Designation | Job role (QA, Worker, SCM, Admin, Supervisor) |
| Reporting Manager | Manager name (all "Premnath" in current data) |
| Email | Work email address |
| Phone | Phone number |

**Filters:** None
**Search:** None
**Sorting:** None
**Export:** None

---

# KPI & ANALYTICS

## KPI 1 — All Tracked Jobs

- **KPI Name:** All Tracked Jobs
- **Sub-label:** Total on shop floor
- **Displayed Value:** Total count of all jobs in the Plant Team Tracking table (6 in sample data)
- **Related Metrics:** Feeds into the doughnut chart total
- **Related Actions:** Click navigates to Plant Team Tracking screen

---

## KPI 2 — Jobs Done & Dispatched

- **KPI Name:** Jobs Done & Dispatched
- **Sub-label:** Completed successfully (green text)
- **Displayed Value:** Count of jobs with status "Done" or dispatch = "Completed"
- **Related Metrics:** "Done" segment in the doughnut chart
- **Related Actions:** Click navigates to Plant Team Tracking screen

---

## KPI 3 — In Progress / Pending

- **KPI Name:** In Progress / Pending
- **Sub-label:** Active in Assembly/Testing (amber/warning text)
- **Displayed Value:** Count of jobs with status "Pending" (jobs actively in assembly, testing, or dispatch stages)
- **Related Metrics:** "In Progress" and "Pending" segments in the doughnut chart
- **Related Actions:** Click navigates to Plant Team Tracking screen

---

## KPI 4 — Stuck / Delayed

- **KPI Name:** Stuck / Delayed
- **Sub-label:** Past target dispatch date (amber/warning text)
- **Displayed Value:** Count of jobs with status "Stuck" or "Need Support"
- **Related Metrics:** "Stuck / Need Support" segment (red) in the doughnut chart
- **Related Actions:** Click navigates to Plant Team Tracking screen

---

## Analytics Chart 1 — Current Shop Floor Status

- **Type:** Doughnut chart
- **Segments and colours:**
  - Done — green (#10b981)
  - In Progress — amber (#f59e0b)
  - Pending — blue (#3b82f6)
  - Stuck / Need Support — red (#ef4444)
- **Legend:** Displayed below the chart using point-style markers
- **Data source:** Live from the Plant Team Tracking job list; refreshes when any status is changed

---

## Analytics Chart 2 — Plant Team WAM Hours (This Week)

- **Type:** Vertical bar chart
- **X-axis:** Employee names
- **Y-axis:** Planned hours (or planned task count if no hours are recorded)
- **Bar colour:** Green (#10b981) with rounded tops
- **Dataset label:** "Planned Hours" (or "Planned Tasks" in fallback mode)
- **Data source:** WAM entries filtered to the Plant Team department; refreshes when WAM entries are added or deleted

---

# USER INTERACTIONS

The following actions are available within the application:

| Action | Where Available | Trigger |
|---|---|---|
| **Navigate** | All screens | Click sidebar nav items |
| **Search** | Global (all screens) | Type in header search bar |
| **Toggle Theme** | All screens (header) | Click "🌙 Mode" / "☀️ Mode" button |
| **Toggle Mobile Menu** | Mobile only | Click hamburger icon (≤768 px) |
| **View KPI** | Dashboard | Visible at all times when on Dashboard |
| **Click KPI Card** | Dashboard | Click any KPI card → navigates to Plant Team Tracking |
| **Add Entry** | Plant Team Tracking | Click "+ Add Entry" button → browser prompts |
| **Change Status** | Plant Team Tracking | Select from per-row "Change Status" dropdown |
| **Submit WAM Entry** | My WAM | Fill form → click "Submit WAM Entry" |
| **Delete WAM Entry** | My WAM → My Weekly Plan table | Click "✕" button on a row → confirmation dialog |
| **Trigger WAM to SCM** | My WAM → My Weekly Plan table | Click "Trigger" button → confirmation dialog |
| **View Directory** | Directory | Navigate to Directory screen |
| **Export Performance Report** | Reports | Click "Export CSV" on Plant Team Performance Report card |
| **Export WAM Report** | Reports | Click "Export CSV" on WAM Compliance Report card |
| **View Settings / Role** | Settings | Navigate to Settings screen |

---

# WORKFLOWS

## Workflow 1 — Monitor Shop Floor at a Glance

```
Open Application
    ↓
Dashboard loads (default screen)
    ↓
View 4 KPI cards (All Jobs / Done / Pending / Stuck counts)
    ↓
View doughnut chart (status distribution)
    ↓
View bar chart (WAM task distribution by employee)
    ↓
Click any KPI card
    ↓
Navigate to Plant Team Tracking for detail
```

---

## Workflow 2 — Update a Job Status

```
Navigate to Plant Team Tracking (sidebar or KPI card click)
    ↓
Locate job row in the table
    ↓
Click "Change Status" dropdown on that row
    ↓
Select: Done / Pending / Stuck / Need Support
    ↓
Status badge updates instantly in the same row
    ↓
Dashboard KPI counts and doughnut chart update live
```

---

## Workflow 3 — Add a New Tracking Entry Directly

```
Navigate to Plant Team Tracking
    ↓
Click "+ Add Entry" button
    ↓
Browser prompt: Enter task name → OK
    ↓
Browser prompt: Enter employee name (default: Sneha Pillai) → OK
    ↓
New row appears at top of table (current week dates, blank day)
    ↓
Set status via "Change Status" dropdown if needed
```

---

## Workflow 4 — Submit a Weekly Work Plan (WAM)

```
Navigate to My WAM (sidebar)
    ↓
"Submit Weekly Plan" sub-tab is active
    ↓
Verify / adjust Week Start and Week End dates
    ↓
Select Employee from dropdown
    ↓
Select Day (Monday – Saturday)
    ↓
Enter Task Name (required)
    ↓
Enter Description (optional)
    ↓
Click "Submit WAM Entry"
    ↓
If validation fails → alert: "Week dates and task name are required."
    ↓
If valid → entry added to top of "My Weekly Plan" table
    ↓
Form clears; Day resets to current weekday
```

---

## Workflow 5 — Trigger WAM Plan to Plant Team Tracking

```
Navigate to My WAM
    ↓
Confirm WAM entries exist in "My Weekly Plan" table
    ↓
Click "Trigger" button (below the table)
    ↓
Confirmation dialog: "Trigger N WAM entries to Plant Team Tracking?"
    ↓
Click OK
    ↓
All Plant Team WAM entries are copied to the Plant Team Tracking table
    ↓
Each entry receives status "Planned" (blue badge)
    ↓
Alert confirms: "Triggered N entries to Plant Team Tracking."
    ↓
Dashboard KPIs and charts refresh
```

---

## Workflow 6 — Delete a WAM Entry

```
Navigate to My WAM
    ↓
Locate entry in "My Weekly Plan" table
    ↓
Click "✕" (delete button) on the row
    ↓
Confirmation dialog: "Delete this WAM entry?"
    ↓
Click OK → entry is removed from the table
    ↓
Dashboard bar chart refreshes
```

---

## Workflow 7 — Export a Report

```
Navigate to Reports (sidebar)
    ↓
Choose report:
    ├── Plant Team Performance Report → click "Export CSV"
    │       ↓
    │   Downloads: plant-team-performance.csv
    │   (Columns: Week, Day, Employee, Task, Description
    │    or Job No., Customer, Assembly, Testing, Dispatch, Target Date)
    │
    └── WAM Compliance Report → click "Export CSV"
            ↓
        Downloads: plant-team-wam-report.csv
        (Columns: Week, Day, Employee, Task, Description, Status)
```

---

# ROLE VISIBILITY

The application displays two identities:

## Premnath (Manager)
- **Shown in:** Top header as "Premnath (Manager)" with a green online dot
- **Visible in the UI:** All screens and all data are accessible without any restriction visible in the UI.
- **Implied access** (as seen in the interface): Can view all team members' WAM entries, can change status on any job, can trigger WAM to tracking, can export all reports.

## Plant Team Engineer (Logged-in user role)
- **Shown in:** Settings screen → "Your Role" field (value: "Plant Team Engineer")
- **Permissions displayed:** "Can edit Plant Team Tracking and own WAM."
- No UI elements are visibly hidden or locked for this role in the HTML — the settings screen is the only place the role and permission description appear.

> Note: The JavaScript sets `currentUserName = 'Sneha Pillai'` as the logged-in user, but the header badge displays "Premnath (Manager)". The WAM form defaults the employee dropdown to Sneha Pillai. These are the only role-related distinctions visible in the HTML.

---

# UI COMPONENT INVENTORY

## Menus
- **Sidebar navigation** — collapsible icon-rail (80 px collapsed, 260 px on hover); 5 primary items + 1 bottom settings item
- **Mobile hamburger menu** — visible only on screens ≤ 768 px; opens sidebar as a full-height overlay drawer

## Cards
- 4 × KPI cards (clickable, with title, large numeric value, and sub-label)
- 2 × Chart cards (title + Chart.js canvas)
- 2 × Table cards (with title and action buttons)
- 2 × Report cards (with icon, title, description, and export button)
- 1 × Settings info card

## Charts
- 1 × Doughnut chart — Current Shop Floor Status
- 1 × Bar chart — Plant Team WAM Hours (This Week)
- Library: Chart.js (loaded from CDN)

## Widgets
- User profile badge (online dot + name + role label) in the top header
- Theme toggle button (🌙 / ☀️ Mode)

## Forms
- WAM Entry Form (6 fields: 2 date pickers, 1 employee dropdown, 1 day dropdown, 1 task text, 1 description text)
- Add SCM Entry (browser `prompt()` dialogs — not a traditional HTML form)

## Tables
- Plant Team Tracking table (7 columns, inline status dropdown per row)
- My Weekly Plan / WAM table (6 columns, delete button per row)
- Employee Directory table (6 columns, read-only)

## Buttons
| Button Label | Style | Location |
|---|---|---|
| + Add Entry | Primary (green), small | Plant Team Tracking |
| Submit WAM Entry | Primary (green) | My WAM → form card |
| Trigger | Default (outlined) | My WAM → plan table |
| Export CSV (×2) | Primary (green), small | Reports screen |
| ✕ (delete) | Icon button (red on hover) | WAM table rows |
| 🌙 Mode / ☀️ Mode | Default | Top header |
| Hamburger icon | Icon button | Top header (mobile only) |

## Filters
- No filter dropdowns or filter bars are present on any screen
- The global search bar exists in the header but its search/filter behaviour is not connected to any table in the HTML

## Popups / Modals
- Browser `confirm()` dialogs — used before deleting a WAM entry and before triggering WAM to SCM
- Browser `alert()` dialogs — used for validation errors and post-trigger confirmation
- Browser `prompt()` dialogs — used for quick-add entry in Plant Team Tracking

## Notifications
- No toast notifications or in-app notification panels. All user feedback is via native browser `alert()` and `confirm()` dialogs.

## Tabs
- **Sidebar nav items** function as top-level page tabs (one active at a time)
- **Sub-tab bar** on the My WAM screen — contains one tab: "Submit Weekly Plan" (no other tabs rendered)

## Status Badges
Colour-coded pill badges used in the tracking table:

| Status | Colour |
|---|---|
| Done | Green |
| Completed | Green |
| In Progress | Amber |
| Planned | Blue |
| Pending | Gray |
| Missed | Red |
| Overdue | Red |
| Need Support | Red |
| Blocked | Red |

---

# CONTENT HIERARCHY

```
Villva ERP — Plant Team Workspace
│
├── Top Header (persistent across all screens)
│   ├── Hamburger Menu Button (mobile)
│   ├── Page Title (dynamic, updates per screen)
│   ├── Global Search Bar
│   ├── User Badge: "Premnath (Manager)"
│   └── Theme Toggle Button
│
├── Sidebar (collapsible icon rail)
│   ├── Brand Logo + "Villva" name
│   ├── Dashboard (nav item)
│   ├── Plant Team Tracking (nav item)
│   ├── My WAM (nav item)
│   ├── Directory (nav item)
│   ├── Reports (nav item)
│   └── Settings (nav item — bottom)
│
└── Main Content Area (one active screen at a time)
    │
    ├── Dashboard (default)
    │   ├── KPI Grid
    │   │   ├── All Tracked Jobs card
    │   │   ├── Jobs Done & Dispatched card
    │   │   ├── In Progress / Pending card
    │   │   └── Stuck / Delayed card
    │   └── Charts Grid
    │       ├── Current Shop Floor Status (doughnut)
    │       └── Plant Team WAM Hours This Week (bar)
    │
    ├── Plant Team Tracking
    │   └── Table Card: Production / Plant Team Work Tracking
    │       ├── "+ Add Entry" button
    │       └── Tracking Table
    │           └── Rows: Week | Day | Employee | Task | Description | Status Badge | Change Status
    │
    ├── My WAM
    │   ├── Sub-tab Bar
    │   │   └── "Submit Weekly Plan" (active tab)
    │   └── Sub-tab Panel: Submit Weekly Plan
    │       ├── Card: Add My Weekly Task
    │       │   ├── Week Start Date (date input)
    │       │   ├── Week End Date (date input)
    │       │   ├── Employee (dropdown)
    │       │   ├── Day (dropdown)
    │       │   ├── Task Name (text input)
    │       │   ├── Description (text input)
    │       │   └── "Submit WAM Entry" button
    │       └── Card: My Weekly Plan
    │           ├── WAM Table
    │           │   └── Rows: Week | Day | Employee | Task | Description | Delete (✕)
    │           └── "Trigger" button
    │
    ├── Directory
    │   └── Table Card: Employee Master
    │       └── Directory Table
    │           └── Rows: Name | Department | Designation | Manager | Email | Phone
    │
    ├── Reports
    │   ├── Section intro text
    │   └── Report Grid
    │       ├── Plant Team Performance Report card
    │       │   └── "Export CSV" button
    │       └── WAM Compliance Report card
    │           └── "Export CSV" button
    │
    └── Settings
        └── Card: Department Access
            ├── Your Role (disabled input: "Plant Team Engineer")
            └── Permissions (disabled input: "Can edit Plant Team Tracking and own WAM.")
```

---

# COMPLETE APPLICATION BLUEPRINT

## What the System Is

**Villva ERP – Plant Team Workspace** is a single-page web application (SPA) used by the Plant Team at Flowtech, an engineering manufacturing company. It is part of the broader Villva ERP suite. The workspace is designed so that both the plant team manager and individual engineers can operate from one screen without needing separate tools.

The system has no login screen visible — the user identity (Premnath, Manager) is hard-coded into the header, and the session user (Sneha Pillai, Plant Team Engineer) is set in the application logic. All data is in-memory within the browser; there is no visible connection to a server or database.

---

## How the System Works — Screen by Screen

### Starting the Application
When the application loads, the **Dashboard** is the first screen shown. The system immediately computes KPI values from the pre-loaded job list and renders two charts. The sidebar is visible but collapsed to icons only; hovering over it reveals full labels.

### The Dashboard
The top row shows four large number cards. The first card shows how many total jobs the plant team is currently tracking. The second shows how many are fully done and dispatched. The third shows how many are still in progress or pending. The fourth shows how many are stuck or need support.

Below the KPI cards, two charts present the same data visually. The doughnut chart on the left breaks down all jobs by their current stage using colour segments. The bar chart on the right shows how much planned work (in tasks or hours) each team member has been assigned in the current week. Both charts update in real time whenever a status changes elsewhere in the application.

Clicking any of the four KPI cards jumps directly to the Plant Team Tracking screen.

### Plant Team Tracking
This is the operational heart of the system. It displays a table that looks like a spreadsheet. Each row represents one job or task. The columns show the week period, the day, which employee is responsible, what the task is, a description, and its current status shown as a coloured badge.

The manager or engineer can change any job's status directly in the table using the dropdown at the right of each row. Choosing "Done" turns the badge green; "Pending" turns it gray; "Stuck" or "Need Support" turns it red. The moment a status changes, the Dashboard KPI numbers and chart slices update automatically.

A "+ Add Entry" button at the top right of the table lets anyone add a new job by answering two popup questions: the task name and the responsible employee's name.

### My WAM (Work Allocation Matrix)
This screen is the planning module. It has two parts. The top part is a form where a team member fills in the week dates, picks their name from a dropdown, selects the day they are planning for, types a task name, and optionally adds a description. When they click "Submit WAM Entry," the entry is saved and immediately appears in the table below. If required fields are blank, the system shows an alert.

The bottom part shows the "My Weekly Plan" table — all WAM entries for the Plant Team department, most recent at the top. Each entry has a delete button. At the bottom of the table is a **Trigger** button. When the manager clicks Trigger, all entries in the WAM list are batch-transferred into the Plant Team Tracking table, each starting with a "Planned" (blue) status. This is the handoff mechanism between planning and active tracking.

### Directory
A simple read-only reference table. It shows all six Plant Team employees: Selvaraj (QA), Sivakumar (Worker), Rajesh (SCM), ACS (Admin), Gopinath (Worker), and Parthipan (Supervisor) — all reporting to Premnath. Their email addresses and phone numbers are shown. Nothing on this screen can be edited.

### Reports
Two export buttons generate CSV downloads. The first, **Plant Team Performance Report**, exports the tracking table data (job list with week, employee, task, and description columns). The second, **WAM Compliance Report**, exports the WAM entries (week, day, employee, task, description, status). Both files download immediately to the user's device and are described as "ready for Excel."

### Settings
A read-only information panel showing the currently logged-in role ("Plant Team Engineer") and a one-line description of what that role is permitted to do: edit Plant Team Tracking and manage their own WAM.

---

## Theme and Display
The application supports a light mode (default) and a dark mode. Clicking the "🌙 Mode" button in the top header switches all backgrounds, text, borders, and chart colours to a dark palette. Clicking again ("☀️ Mode") switches back. The switch is instant and applies across all screens.

On screens narrower than 768 px (mobile devices), the sidebar hides off-screen and a hamburger icon appears in the header. Tapping the hamburger slides the sidebar in from the left with a dark overlay behind it. Tapping the overlay or selecting a nav item closes the sidebar automatically.

---

## Status System
Every job and task in the system carries one of the following statuses:

- **Done / Completed** — job is fully finished and dispatched (green badge)
- **In Progress** — actively being worked on (amber badge)
- **Planned** — added via WAM trigger, not yet started (blue badge)
- **Pending** — waiting to begin (gray badge)
- **Missed / Overdue / Need Support / Blocked** — problem statuses requiring attention (red badge)

Users can move a job to "Done," "Pending," "Stuck," or "Need Support" via the tracking table dropdown. The status system is the same colour logic that drives the dashboard doughnut chart.

---

## Data Flow Summary

```
WAM Form (plan) → WAM Table (staged plan) → Trigger → Plant Team Tracking Table (active tracking)
                                                                    ↓
                                                        Status Change Dropdown
                                                                    ↓
                                              Dashboard KPIs + Charts refresh live
                                                                    ↓
                                                       Reports → CSV Export
```

The WAM form is where work is planned. The Trigger action is the bridge between planning and doing. The Tracking table is where status is managed day-to-day. The Dashboard reflects everything in real time. Reports capture snapshots for sharing outside the system.
