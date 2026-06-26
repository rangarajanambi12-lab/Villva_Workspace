# PROJECT SUMMARY

The Villva ERP Application Engineer Workspace is a specialized dashboard application designed for Application Engineers within the Villva ERP system. This workspace provides centralized visibility and management of engineering enquiries, quotations, work allocation, and performance metrics. The application is purpose-built for Flowtech operations, combining customer inquiry tracking with internal work management and executive visibility. It supports role-based access, multi-view navigation, real-time KPI monitoring, and data export capabilities.

---

# APPLICATION OVERVIEW

## What This Application Does
The Villva ERP Application Engineer Workspace is an operations coordination and visibility platform that consolidates engineering activities across multiple dimensions: customer inquiries, quotation management, work allocation, and performance tracking. Application Engineers can view, track, and manage customer technical requests while maintaining visibility of their work pipeline.

## Intended Users
- Application Engineers (primary users)
- Managers (secondary access for supervision)
- MD (Executive visibility)

## Main Objective
Provide Application Engineers with real-time visibility of:
- Pending customer enquiries requiring responses
- Current work assignments and status
- Quotation status tracking
- Performance metrics and KPIs
- Overdue or delayed enquiries requiring escalation

## Key Functions
1. Dashboard overview with KPI monitoring
2. Pending enquiry management and tracking
3. General work tracking and assignments
4. Quotation status visibility
5. Performance reporting and analytics
6. Data export (PDF and Excel)
7. Real-time notifications
8. Theme switching (light/dark mode)
9. Search and filtering capabilities
10. Role-based content visibility

---

# NAVIGATION STRUCTURE

```
Villva ERP Application Engineer Workspace
├── Dashboard
│   └── Overview (Default View)
├── Pending Enquiry
│   └── Enquiry List
├── General Work
│   └── Work List
├── Quotations
│   └── Quotation Tracking
├── Reports
│   ├── Pending Enquiry Report
│   ├── Quotation Status Report
│   ├── Delayed Enquiry Report
│   ├── Pending Ownership Report
│   ├── General Work Report
│   └── Monthly Performance Report
└── Settings
    └── Preferences
```

---

# PAGES & SCREENS

## Dashboard View
### Purpose
Provide an at-a-glance overview of Application Engineer activities and key performance indicators.

### Visible Components
- KPI cards showing pending enquiries, pending quotations, delayed enquiries, and pending ownership assignments
- Line chart showing monthly pending enquiries trend
- Bar chart showing quotation status distribution
- Quick action buttons for navigation
- Search bar for global search

### User Actions
- Click KPI cards to view detailed records
- View trends in monthly data
- Navigate to specific modules
- Search across application

### Navigation Connections
- Links to Pending Enquiry view
- Links to Quotation tracking
- Direct access to Reports section

---

## Pending Enquiry View
### Purpose
Display and manage all pending customer enquiries requiring Application Engineer attention and response.

### Visible Components
- Table with columns: Reference, Customer, Product, Status, Age (Days), Assigned Engineer, Last Update
- Filter panel for inquiry status (Pending, In Progress, On Hold)
- Date range filter
- Search functionality
- Action buttons per enquiry row
- Pagination controls
- Export button

### User Actions
- Filter enquiries by status
- Filter by date range
- Search enquiries
- View enquiry details
- Edit enquiry information
- Assign enquiry to engineer
- Update status
- Export filtered data to Excel or PDF
- Sort by columns

### Navigation Connections
- Return to Dashboard
- Access detailed enquiry information
- Generate Pending Enquiry Reports

---

## General Work View
### Purpose
Manage and track general work assignments, including internal tasks and ongoing projects.

### Visible Components
- Table with columns: Task ID, Description, Assigned Engineer, Status, Priority, Due Date, Progress
- Filter options by status (Not Started, In Progress, Completed, On Hold)
- Search functionality
- Action buttons for each task
- Pagination controls
- Export capability

### User Actions
- Filter tasks by status
- Search work items
- View task details
- Update task status
- Modify assigned engineer
- Change priority level
- Export work list
- Sort by columns

### Navigation Connections
- Return to Dashboard
- Generate Work Reports

---

## Quotations View
### Purpose
Track status and progress of quotations generated from customer enquiries.

### Visible Components
- Table with columns: Quote ID, Customer, Enquiry Reference, Amount, Status, Created Date, Expected Close Date
- Filter by quotation status (Draft, Sent, Accepted, Rejected, Expired)
- Search functionality
- Action buttons
- Pagination

### User Actions
- Filter quotations by status
- Search quotations
- View quotation details
- Update quotation status
- Export quotation list

### Navigation Connections
- Return to Dashboard
- Generate Quotation Status Reports

---

## Reports View
### Purpose
Provide analytical summaries and data exports for various operational metrics and KPIs.

### Visible Components
- Report type selector buttons
- Report title display
- Report table with dynamic columns based on selected report type
- Filters applicable to selected report
- Export options (Save as PDF or Excel, Email)
- Date range selection

### User Actions
- Select report type
- Apply filters
- View report data in table format
- Export to PDF
- Export to Excel
- Email report
- Clear filters

### Navigation Connections
- Accessible from Dashboard
- Return to main view

---

## Settings View
### Purpose
Configure user preferences and application settings.

### Visible Components
- Theme selector (Light/Dark mode)
- Notification preferences
- Default filters
- Profile settings display

### User Actions
- Toggle between light and dark themes
- Configure notification settings
- Reset to defaults

### Navigation Connections
- Return to Dashboard

---

# DASHBOARDS

## Main Dashboard

### Purpose
Provide real-time overview of Application Engineer activities and key metrics.

### KPIs Displayed
1. **Pending Enquiries**
   - Value: Numeric count
   - Sub-text: Comparison metric
   - Status indicator: Up/Danger/Warning

2. **Pending Quotations**
   - Value: Numeric count
   - Sub-text: Comparison metric

3. **Delayed Enquiries**
   - Value: Numeric count
   - Sub-text: Comparison metric (shown in danger color)

4. **Pending Ownership**
   - Value: Numeric count
   - Sub-text: Comparison metric

### Charts
1. **Monthly Pending Enquiries Line Chart**
   - X-axis: Months (Jan-Dec)
   - Y-axis: Number of pending enquiries
   - Shows trend over 12-month period
   - Interactive data points

2. **Quotation Status Bar Chart**
   - Categories: Draft, Sent, Accepted, Rejected, Expired
   - Shows count for each status
   - Color-coded bars
   - Interactive tooltip

### Tables
- None on main dashboard (navigation to detailed views required)

### Filters
- None persistent on dashboard (filters available in detail views)

### Actions
- Click KPI cards to drill down into details
- Navigate to specific modules via buttons
- View chart details on hover

---

# MODULES

## Pending Enquiry Management Module
### Purpose
Centralized management of all customer technical enquiries requiring Application Engineer responses.

### Features
- Complete enquiry list with status tracking
- Age-based sorting (days pending)
- Customer and product information
- Assignment tracking to specific engineers
- Last update timestamp
- Status workflow (Pending, In Progress, On Hold, Responded)

### Available Actions
- Create new enquiry record (implied)
- View full enquiry details
- Edit enquiry information
- Assign to engineer
- Change status
- Filter by multiple criteria
- Export filtered results
- Search across enquiries
- Update last contact date

### Related Components
- Enquiry status indicator
- Age counter in days
- Engineer assignment dropdown
- Status change button
- Action menu per record

---

## Quotation Management Module
### Purpose
Track quotation lifecycle from creation through closure.

### Features
- Quotation reference tracking
- Customer linkage
- Enquiry cross-reference
- Quote amount visibility
- Status progression tracking
- Timeline visibility (created date vs. expected close date)
- Quotation aging

### Available Actions
- View quotation details
- Update quotation status
- Change expected close date
- Add notes or comments (implied)
- Export quotation list
- Search quotations
- Filter by status and date range

### Related Components
- Quotation status display
- Amount field
- Date fields (created, expected close)
- Customer information
- Enquiry reference link

---

## General Work Module
### Purpose
Manage internal work assignments, tasks, and project activities.

### Features
- Task identification and description
- Engineer assignment tracking
- Status management (Not Started, In Progress, Completed, On Hold)
- Priority levels (High, Medium, Low - implied)
- Due date tracking
- Progress percentage
- Task categorization

### Available Actions
- Create new work item
- Assign to engineer
- Update progress status
- Change priority
- Extend due date
- Mark complete
- Add notes or updates
- Export work list
- Search tasks

### Related Components
- Progress indicator
- Priority badge
- Status label
- Due date warning system
- Assignment dropdown

---

## Reports Module
### Purpose
Generate analytical summaries and data exports for operational insights.

### Features
Available Report Types:
1. **Pending Enquiry Report** - Lists all pending customer enquiries with age and assignment details
2. **Quotation Status Report** - Shows quotation distribution by status
3. **Delayed Enquiry Report** - Identifies enquiries exceeding acceptable age thresholds
4. **Pending Ownership Report** - Shows enquiries without assigned ownership
5. **General Work Report** - Summarizes all work items, status, and assignments
6. **Monthly Performance Report** - Shows engineer productivity and metrics over monthly periods

### Available Actions
- Select report type
- Apply date range filters
- Apply status filters
- Preview report data in table format
- Export to PDF format
- Export to Excel format
- Email report to recipients
- Save report locally

### Related Components
- Report title display
- Filter controls
- Report data table
- Export options modal
- Email functionality integration

---

## Notification System Module
### Purpose
Deliver real-time alerts and updates about system events and activities.

### Features
- Notification badge with unread count
- Dropdown notification list
- Notification categorization by type
- Timestamp on each notification
- Mark as read functionality
- Notification persistence across session

### Available Actions
- View all notifications
- Click notification to navigate to related item
- Mark notifications as read
- Clear old notifications (implied)
- Filter by notification type (implied)

### Related Components
- Notification bell icon with badge
- Notification dropdown panel
- Notification items with type label
- Timestamp display
- Unread indicator

---

## User Profile and Settings Module
### Purpose
Manage user preferences, authentication, and application settings.

### Features
- User profile display (name, role, status indicator)
- Theme preference (Light/Dark mode)
- Notification preferences
- Default view preference
- Session management

### Available Actions
- Toggle between light and dark theme
- Configure notification settings
- View user profile information
- Log out (implied by user profile presence)

### Related Components
- User profile badge in header
- Theme toggle button
- Settings panel
- Green online indicator dot

---

# FORMS

No traditional form creation screens are visible in this application. The interface is primarily display and read-only with inline editing capabilities. However, the following implied form actions are supported:

## Enquiry Edit Form (Implicit)
### Input Fields
- Enquiry Reference (read-only)
- Customer Name
- Product Name
- Description/Notes
- Status dropdown
- Assigned Engineer dropdown
- Contact information fields

---

## Task Edit Form (Implicit)
### Input Fields
- Task ID (read-only)
- Task Description
- Assigned Engineer dropdown
- Status dropdown
- Priority dropdown
- Due Date field (date picker)
- Progress percentage field

---

## Report Filter Form
### Input Fields
- Report Type selector (button group)
- Date Range (From Date, To Date) - Date picker fields
- Status Filter (Dropdown or checkbox group)
- Customer Filter (Optional)

### Buttons
- Apply Filters
- Clear Filters
- Export as PDF
- Export as Excel
- Save and Email

---

# TABLES

## Pending Enquiries Table
### Table Name
Pending Enquiry Management Table

### Columns
1. Reference - Enquiry identifier
2. Customer - Customer name
3. Product - Product/Service requested
4. Status - Current status (Pending, In Progress, On Hold, Responded)
5. Age (Days) - Number of days pending
6. Assigned Engineer - Name of responsible engineer
7. Last Update - Date of most recent activity

### Filters
- Status filter (multi-select checkbox)
- Date range filter
- Customer filter (implied)

### Search Features
- Global text search across all columns
- Search box in header

### Sorting Options
- Click column headers to sort
- Ascending/Descending toggle
- Default sort by Age (Days) descending

### Export Options
- Export to Excel (.xlsx)
- Export to PDF
- Email with attachment

---

## General Work Table
### Table Name
General Work Items Management Table

### Columns
1. Task ID - Unique task identifier
2. Description - Task details
3. Assigned Engineer - Responsible person
4. Status - Current state (Not Started, In Progress, Completed, On Hold)
5. Priority - Task priority level (High, Medium, Low)
6. Due Date - Target completion date
7. Progress - Percentage or completion indicator

### Filters
- Status filter (multi-select)
- Priority filter
- Engineer filter
- Date range filter

### Search Features
- Global text search
- Search by Task ID
- Search by engineer name

### Sorting Options
- Column-based sorting
- Sort by Due Date
- Sort by Priority
- Sort by Status

### Export Options
- Export to Excel
- Export to PDF
- Generate work reports

---

## Quotations Table
### Table Name
Quotation Status Tracking Table

### Columns
1. Quote ID - Quotation identifier
2. Customer - Customer name
3. Enquiry Reference - Link to source enquiry
4. Amount - Quote value
5. Status - Quote status (Draft, Sent, Accepted, Rejected, Expired)
6. Created Date - When quote was created
7. Expected Close Date - Target decision date

### Filters
- Status filter (Draft, Sent, Accepted, Rejected, Expired)
- Date range filter
- Amount range filter (implied)

### Search Features
- Quote ID search
- Customer search
- Reference search

### Sorting Options
- Amount sort (high to low, low to high)
- Date sort (recent to old, old to recent)
- Status sort

### Export Options
- Export to Excel
- Export to PDF
- Generate quotation reports

---

## Reports Data Table
### Table Name
Dynamic Report Table (columns change based on selected report)

### Columns (Pending Enquiry Report)
- Reference
- Customer
- Product
- Status
- Age (Days)
- Assigned Engineer
- Last Update

### Columns (Quotation Status Report)
- Quote ID
- Customer
- Amount
- Status
- Created Date
- Days Open

### Columns (Delayed Enquiry Report)
- Reference
- Customer
- Product
- Days Delayed
- Assigned Engineer
- Last Contact

### Columns (Pending Ownership Report)
- Reference
- Customer
- Product
- Days Pending
- Status

### Columns (General Work Report)
- Task ID
- Description
- Assigned Engineer
- Status
- Priority
- Days Remaining
- Progress

### Columns (Monthly Performance Report)
- Month
- Enquiries Handled
- Quotations Generated
- Average Response Time
- Completion Rate
- Engineer Name

### Filters
- Dynamic filters based on report type
- Date range filter (all reports)
- Status filter (most reports)

### Search Features
- Column-specific search
- Global search within report

### Sorting Options
- All columns sortable
- Multi-column sort (implied)

### Export Options
- Export to Excel (preserves formatting)
- Export to PDF (includes header and timestamp)
- Email with generated file

---

# KPI & ANALYTICS

## KPI Cards on Main Dashboard

### KPI 1: Pending Enquiries
- **Display Format**: Large numeric value
- **Metric**: Count of enquiries with status = Pending
- **Sub-value**: Comparison indicator (e.g., +5% from last period)
- **Visual Indicator**: Green up arrow for positive trend, red down for negative
- **Drill-down Action**: Click to view detailed Pending Enquiry table
- **Refresh**: Real-time or periodic update

### KPI 2: Pending Quotations
- **Display Format**: Large numeric value
- **Metric**: Count of quotations with status = Draft or Sent
- **Sub-value**: Comparison to previous period
- **Visual Indicator**: Status-based color coding
- **Drill-down Action**: Click to view detailed Quotations table
- **Related Actions**: Generate Quotation Status Report

### KPI 3: Delayed Enquiries
- **Display Format**: Large numeric value (usually in danger color)
- **Metric**: Count of enquiries where Age > threshold (e.g., 7 days)
- **Sub-value**: Escalation indicator or critical flag
- **Visual Indicator**: Red/danger color for critical metric
- **Drill-down Action**: Click to view Delayed Enquiry Report
- **Related Actions**: Assign to engineers, generate escalation reports

### KPI 4: Pending Ownership
- **Display Format**: Large numeric value
- **Metric**: Count of enquiries without assigned engineer
- **Sub-value**: Comparison metric
- **Visual Indicator**: Warning color indicator
- **Drill-down Action**: Click to view Pending Ownership Report
- **Related Actions**: Quick-assign to available engineers

---

## Analytics Charts

### Chart 1: Monthly Pending Enquiries Trend
- **Type**: Line chart
- **X-axis**: Months (January through December)
- **Y-axis**: Number of pending enquiries
- **Data Points**: 12 monthly values
- **Interaction**: Hover for exact values
- **Purpose**: Identify seasonality and trends in enquiry volume
- **Legend**: Single line labeled "Pending Enquiries"

### Chart 2: Quotation Status Distribution
- **Type**: Bar chart
- **Categories**: Draft, Sent, Accepted, Rejected, Expired
- **Y-axis**: Count of quotations in each status
- **Color Coding**: Different color per status
- **Interaction**: Hover for exact count
- **Purpose**: Quick overview of quotation pipeline health
- **Legend**: Status categories with color key

---

# USER INTERACTIONS

## Navigation Interactions
- Click sidebar menu items to switch views
- Click KPI cards to drill down into details
- Use breadcrumb navigation (implied) to go back

## Data Management Interactions
- **View**: Click row in table to open detailed view
- **Edit**: Click edit button or inline field to modify data
- **Delete**: Click delete button with confirmation dialog (implied)
- **Create**: Click "Add New" or "Create" button to open form (implied)
- **Assign**: Select engineer from dropdown in table row
- **Update Status**: Click status field to change state

## Search and Filter Interactions
- **Global Search**: Type in header search bar to find across all records
- **Filter by Status**: Select checkbox or dropdown filter option
- **Filter by Date**: Use date range picker
- **Filter by Engineer**: Select from engineer list
- **Filter by Customer**: Type customer name (implied)

## Report Interactions
- **Select Report**: Click report type button to switch report view
- **Apply Filters**: Select filter options and click "Apply Filters" button
- **View Report**: Automatically populate table with report data
- **Export Report**: Click export button to download file
- **Email Report**: Click email option to send report
- **Clear Filters**: Click "Clear Filters" button to reset selections

## Notification Interactions
- **View Notifications**: Click notification bell icon to open dropdown
- **Read Notification**: Click notification item to view details and navigate
- **Mark Read**: Click on unread notification to mark as read
- **Dismiss**: Click outside dropdown to close notification panel

## Theme and Display Interactions
- **Toggle Theme**: Click theme toggle button to switch between light/dark mode
- **Responsive Layout**: Application adjusts layout on smaller screens
- **Mobile Menu**: Click hamburger icon on mobile to open sidebar

## Export Interactions
- **Select Format**: Choose between PDF and Excel export
- **Export to File**: Click "Export" button to download file locally
- **Email Export**: Click "Send Email" button to open email client with attachment
- **Save Settings**: Export preferences remembered for session

---

# WORKFLOWS

## Enquiry Response Workflow
1. **Monitor Dashboard** - Application Engineer views Pending Enquiries KPI
2. **Review Enquiries** - Navigate to Pending Enquiry view
3. **Filter and Search** - Apply filters to find relevant enquiries
4. **Select Enquiry** - Click to open enquiry details
5. **Review Details** - Read customer request and technical requirements
6. **Prepare Response** - (External action, not in system)
7. **Update Status** - Change enquiry status to "In Progress" or "Responded"
8. **Record Activity** - Update last contact date and add notes
9. **Close or Escalate** - Mark complete or escalate if needed

---

## Quotation Generation Workflow
1. **Receive Request** - Enquiry is marked "Ready for Quotation"
2. **Create Quotation** - Application Engineer initiates new quotation
3. **Enter Details** - Link to enquiry, input quote amount, set terms
4. **Save Draft** - Store quotation with status "Draft"
5. **Review** - Manager reviews quotation if required
6. **Send to Customer** - Change status to "Sent" with date stamp
7. **Track Response** - Monitor for customer response
8. **Update Status** - Mark as "Accepted," "Rejected," or "Expired"
9. **Close Quotation** - Archive completed quotation

---

## Work Assignment Workflow
1. **View Dashboard** - Monitor work queue and assignments
2. **Navigate to Work View** - Click "General Work" in sidebar
3. **Review Work Items** - See all tasks and current assignments
4. **Filter Tasks** - Filter by status or priority
5. **Assign Task** - Click engineer dropdown and select assignee
6. **Set Priority** - Define task priority level
7. **Set Due Date** - Input target completion date
8. **Track Progress** - Update progress percentage as work advances
9. **Change Status** - Update to "In Progress" then "Completed"
10. **Archive Task** - Remove from active list when complete

---

## Report Generation Workflow
1. **Access Reports** - Click "Reports" in sidebar navigation
2. **Select Report Type** - Choose from six available report options
3. **Apply Filters** - Set date range, status, and other relevant filters
4. **View Report** - System generates and displays report data in table
5. **Review Data** - Examine table contents for accuracy
6. **Choose Export Format** - Select PDF or Excel option
7. **Export Report** - Click export button to download file
   - **Or Email Report** - Click email button to send via email client
8. **Save Locally** - (User action outside system)
9. **Archive or Share** - (User action outside system)

---

## Daily Operations Workflow
1. **Login** - Access application with credentials
2. **View Dashboard** - See overview of all KPIs
3. **Check Notifications** - Click bell icon to view alerts
4. **Review Pending Enquiries** - Check for new or aging enquiries
5. **Monitor Quotations** - Review quotation status and age
6. **Update Work Status** - Change status of assigned tasks
7. **Generate Reports** - Create periodic reports for management
8. **Search Specific Record** - Use search function to find details
9. **Export Data** - Download data for external use or sharing
10. **Switch Theme** - Toggle dark mode if preferred
11. **Logout** - End session (implied)

---

## Escalation Workflow (Implied)
1. **Monitor Delayed Enquiries** - View Delayed Enquiry KPI on dashboard
2. **Identify Critical Items** - Items with Age > 7 days (configurable)
3. **Navigate to Report** - Click to view Delayed Enquiry Report
4. **Review Details** - Check customer, product, and age details
5. **Assess Status** - Determine why enquiry is delayed
6. **Assign Engineer** - If unassigned, quickly assign from dropdown
7. **Add Notes** - Document escalation reason or action plan
8. **Change Priority** - Mark as high priority if needed
9. **Set Follow-up** - Update due date for next action
10. **Notify Manager** - (External action, system captures state for email)
11. **Document Resolution** - Update status when escalation is resolved

---

# ROLE VISIBILITY

Based on the HTML analysis, role-based visibility is implemented through conditional rendering. The following visibility patterns are evident:

## Application Engineer Role (Primary User)
**Visible Views:**
- Dashboard (full view with all KPIs)
- Pending Enquiry (read and update permissions)
- General Work (read and update permissions)
- Quotations (read and limited update permissions)
- Reports (read-only, all report types accessible)
- Settings (personal preferences only)

**Visible Data:**
- All pending enquiries assigned to engineer
- All quotations linked to their enquiries
- All work items assigned to engineer
- Complete reports with full data access
- Personal notification list

**Available Actions:**
- Update enquiry status
- Assign own tasks
- Edit work progress
- View all reports
- Export reports
- Search across own records

---

## Manager Role (Secondary Access - Implied)
**Visible Views:**
- Dashboard (filtered for team view)
- Pending Enquiry (view assigned team members' enquiries)
- General Work (view team's work items)
- Quotations (view team's quotations)
- Reports (all team reports)

**Visible Data:**
- Team member enquiries and quotations
- Team performance metrics
- Team work allocation

**Available Actions:**
- View team KPIs
- Assign work to team members
- Approve status changes
- Generate team reports

---

## MD Role (Executive - Implied)
**Visible Views:**
- Dashboard (company-wide overview)
- Reports (all company reports)
- May have separate MD dashboard (not visible in this HTML)

**Visible Data:**
- Company-wide KPIs
- All department metrics
- Consolidated reports

**Available Actions:**
- View all reports
- Export for executive use
- Monitor company metrics

---

# UI COMPONENT INVENTORY

## Navigation Components
- **Sidebar Menu** - Collapsible left navigation with icon and text labels
- **Menu Items** - 6 main navigation items: Dashboard, Pending Enquiry, General Work, Quotations, Reports, Settings
- **Active Indicator** - Green highlight on active menu item
- **Hover State** - Sidebar expands from 80px to 260px on hover

---

## Header Components
- **Logo and Brand** - Villva logo with brand name
- **Search Bar** - Central search input with magnifying glass icon
- **Theme Toggle** - Dark/Light mode switcher button
- **Notification Bell** - Icon with unread count badge
- **User Profile Badge** - Display name, role, and online status indicator
- **Hamburger Menu** - Mobile navigation toggle (hidden on desktop)

---

## Card Components
- **KPI Cards** - Four cards displaying key metrics with values and sub-text
- **Card Hover State** - Elevation effect and green border highlight
- **Card Click Action** - Drill-down to detailed views

---

## Chart Components
- **Line Chart** - Monthly pending enquiries trend (Chart.js)
- **Bar Chart** - Quotation status distribution (Chart.js)
- **Chart Interaction** - Tooltip on hover, responsive sizing
- **Chart Legend** - Category labels and color coding

---

## Table Components
- **Data Tables** - Multiple tables for enquiries, work, and quotations
- **Table Headers** - Column names, sortable headers
- **Table Rows** - Data records with action buttons
- **Pagination** - Navigate through record pages
- **Action Buttons** - Edit, delete, view, assign buttons per row

---

## Filter Components
- **Status Filter** - Checkbox or dropdown for filtering by status
- **Date Range Filter** - From date and To date pickers
- **Search Filter** - Text input for searching
- **Filter Apply Button** - Trigger filter application
- **Clear Filter Button** - Reset all filters to default

---

## Form Components
- **Input Fields** - Text inputs for names, IDs, descriptions
- **Dropdown Select** - Engineer selection, status selection, priority selection
- **Date Picker** - Calendar date selection for due dates and date ranges
- **Checkbox** - Multi-select filter options
- **Radio Buttons** - Single-select options (theme selection)
- **Buttons** - Primary action buttons (green), secondary buttons (gray)

---

## Dialog and Modal Components
- **Export Options Modal** - Popup with export format and action choices
- **Confirmation Modal** - For delete actions (implied)
- **Details Panel** - Side or full-screen panel for record details (implied)
- **Overlay** - Semi-transparent background for modal focus

---

## Notification Components
- **Notification Bell** - Icon in header with badge count
- **Notification Dropdown** - Expandable panel below bell icon
- **Notification Items** - Individual notifications with type, message, and timestamp
- **Unread Indicator** - Green background highlight for unread notifications
- **Notification Type Label** - Category badge on each notification

---

## Button Components
- **Primary Button** - Green background, white text (main actions)
- **Secondary Button** - Gray background with border (alternative actions)
- **Small Button** - Compact sizing for inline actions
- **Danger Button** - Red styling for delete operations (implied)
- **Disabled Button** - Grayed out state for unavailable actions (implied)

---

## Icon Components
- **Navigation Icons** - SVG icons for each menu item
- **Action Icons** - Edit, delete, view, download icons
- **Status Icons** - Visual indicators for status states
- **Notification Icon** - Bell icon with dynamic badge

---

## Display Components
- **Data Labels** - Text labels for data values
- **Status Badges** - Color-coded status indicators
- **Progress Indicators** - Visual representation of progress percentage
- **Age Indicators** - Days pending shown numerically
- **Timestamp Display** - Date and time formatting

---

## Layout Components
- **Dashboard Grid** - Responsive grid layout for KPI cards
- **Charts Grid** - Responsive grid for chart placement
- **Flex Containers** - Alignment and spacing for complex layouts
- **Sticky Header** - Top header remains visible while scrolling content

---

# CONTENT HIERARCHY

```
Villva ERP Application Engineer Workspace
│
├── Top Header Section
│   ├── Brand Logo and Name
│   ├── Search Bar
│   ├── Theme Toggle Button
│   ├── Notification Bell with Badge
│   └── User Profile Badge
│
├── Sidebar Navigation
│   ├── Dashboard
│   ├── Pending Enquiry
│   ├── General Work
│   ├── Quotations
│   ├── Reports
│   └── Settings
│
└── Main Content Area
    │
    ├── Dashboard View (Primary)
    │   ├── KPI Cards Section
    │   │   ├── Pending Enquiries Card
    │   │   ├── Pending Quotations Card
    │   │   ├── Delayed Enquiries Card
    │   │   └── Pending Ownership Card
    │   │
    │   └── Charts Section
    │       ├── Monthly Pending Enquiries Chart
    │       └── Quotation Status Distribution Chart
    │
    ├── Pending Enquiry View
    │   ├── Filter Panel
    │   │   ├── Status Filter
    │   │   ├── Date Range Filter
    │   │   └── Search Box
    │   │
    │   ├── Data Table
    │   │   ├── Reference Column
    │   │   ├── Customer Column
    │   │   ├── Product Column
    │   │   ├── Status Column
    │   │   ├── Age Column
    │   │   ├── Assigned Engineer Column
    │   │   ├── Last Update Column
    │   │   └── Action Buttons Column
    │   │
    │   └── Pagination Controls
    │
    ├── General Work View
    │   ├── Filter Panel
    │   │   ├── Status Filter
    │   │   ├── Priority Filter
    │   │   ├── Engineer Filter
    │   │   └── Date Range Filter
    │   │
    │   ├── Data Table
    │   │   ├── Task ID Column
    │   │   ├── Description Column
    │   │   ├── Assigned Engineer Column
    │   │   ├── Status Column
    │   │   ├── Priority Column
    │   │   ├── Due Date Column
    │   │   ├── Progress Column
    │   │   └── Action Buttons Column
    │   │
    │   └── Pagination Controls
    │
    ├── Quotations View
    │   ├── Filter Panel
    │   │   ├── Status Filter (Draft, Sent, Accepted, Rejected, Expired)
    │   │   ├── Date Range Filter
    │   │   └── Search Box
    │   │
    │   ├── Data Table
    │   │   ├── Quote ID Column
    │   │   ├── Customer Column
    │   │   ├── Enquiry Reference Column
    │   │   ├── Amount Column
    │   │   ├── Status Column
    │   │   ├── Created Date Column
    │   │   ├── Expected Close Date Column
    │   │   └── Action Buttons Column
    │   │
    │   └── Pagination Controls
    │
    ├── Reports View
    │   ├── Report Type Selector
    │   │   ├── Pending Enquiry Report Button
    │   │   ├── Quotation Status Report Button
    │   │   ├── Delayed Enquiry Report Button
    │   │   ├── Pending Ownership Report Button
    │   │   ├── General Work Report Button
    │   │   └── Monthly Performance Report Button
    │   │
    │   ├── Report Details
    │   │   ├── Report Title
    │   │   ├── Generated Date
    │   │   └── Data Table with Dynamic Columns
    │   │
    │   ├── Filter Panel (Dynamic based on report type)
    │   │   ├── Date Range Filter
    │   │   ├── Status Filter
    │   │   └── Other Report-Specific Filters
    │   │
    │   └── Export Options
    │       ├── Export to PDF Button
    │       ├── Export to Excel Button
    │       └── Email Report Button
    │
    └── Settings View
        ├── Theme Preference
        │   ├── Light Mode Option
        │   └── Dark Mode Option
        │
        ├── Notification Preferences
        │   ├── Email Notifications Toggle
        │   └── System Notifications Toggle
        │
        └── Default Settings
            ├── Default View
            └── Default Filters

```

---

# COMPLETE APPLICATION BLUEPRINT

## System Overview

The Villva ERP Application Engineer Workspace is a specialized operational dashboard designed to serve Application Engineers at Flowtech. It is a web-based single-page application that consolidates visibility across customer enquiries, work assignments, quotation tracking, and performance metrics. The system provides a unified interface for engineers to monitor their responsibilities while offering managers and executives visibility into team and company-wide performance.

---

## Core Architecture and Layout

The application follows a modern dashboard layout with three primary sections:

**1. Persistent Header**
The top header remains visible at all times and contains:
- Villva ERP branding with logo
- Centralized search functionality to find records across the system
- Theme switcher for light and dark mode
- Notification bell icon showing unread alerts
- User profile badge displaying name, role, and online status indicator

**2. Collapsible Sidebar Navigation**
A left-side navigation menu that:
- Displays as a narrow icon bar (80 pixels) by default
- Expands to full width (260 pixels) on hover to show complete menu labels
- Contains six main navigation sections: Dashboard, Pending Enquiry, General Work, Quotations, Reports, and Settings
- Highlights the active section with green background and text color
- Uses smooth animations for state transitions

**3. Main Content Area**
A flexible content region that:
- Displays different content based on selected navigation item
- Adjusts width based on sidebar state
- Scrolls independently of header and sidebar
- Accommodates tables, charts, cards, and filters

---

## Primary Views

### Dashboard (Landing Page)

The dashboard provides immediate visibility into operational status through:

**KPI Cards Section**
Four prominently displayed metric cards showing:
- **Pending Enquiries**: Total count of customer requests awaiting response
- **Pending Quotations**: Total quotations in draft or sent status requiring follow-up
- **Delayed Enquiries**: Count of enquiries exceeding acceptable response timeframes
- **Pending Ownership**: Enquiries without assigned engineer responsibility

Each KPI card includes:
- Large numeric value for quick scan
- Descriptive title
- Comparison metric showing trend (up, down, or neutral)
- Color coding: Green for positive, Red/Orange for alerts
- Click-through action to drill into detailed data

**Analytics Charts Section**
Two visual representations of trends:
- **Monthly Pending Enquiries Chart**: Line chart showing 12-month trend of pending enquiry volume, allowing identification of seasonal patterns
- **Quotation Status Distribution**: Bar chart showing count of quotations in each status category (Draft, Sent, Accepted, Rejected, Expired), providing pipeline visibility

Both charts feature:
- Interactive hover tooltips showing exact values
- Responsive sizing to viewport width
- Color-coded categories for quick interpretation
- Legend for clarity

**Purpose**
The dashboard serves as the landing page and executive summary, enabling Application Engineers to assess their workload at a glance and access detailed views for deeper analysis.

---

### Pending Enquiry Management View

This view is dedicated to managing customer technical enquiries requiring attention.

**Data Display**
A comprehensive table containing all pending customer enquiries with the following columns:
- **Reference**: Unique enquiry identifier for tracking
- **Customer**: Name of requesting company
- **Product**: Type of product or service requested
- **Status**: Current state (Pending, In Progress, On Hold, Responded)
- **Age (Days)**: Number of days since enquiry was received - critical for identifying aging items
- **Assigned Engineer**: Name of responsible engineer or "Unassigned" indicator
- **Last Update**: Date of most recent activity or note
- **Actions**: Inline buttons for editing, assigning, or updating status

**Filtering System**
Multiple filter options enable engineers to focus on relevant enquiries:
- **Status Filter**: Multi-select checkbox to show enquiries in specific states
- **Date Range Filter**: Calendar pickers for filtering by received date
- **Search Function**: Text search across all enquiry fields

**Interaction Patterns**
- Click table header to sort by any column
- Click filter options to apply or modify filters
- Click "Clear Filters" to reset to unfiltered view
- Select engineer from dropdown in Assigned Engineer column to reassign enquiry
- Click edit icon to open enquiry details for full information update
- Click status field to change enquiry state

**Pagination**
Table includes pagination controls to navigate through enquiry records, with options to adjust records shown per page.

**Export Capability**
Filtered enquiry list can be exported:
- To Excel format for local analysis or sharing
- To PDF format for documentation or distribution
- Via email with generated attachment

**Purpose**
This view enables Application Engineers to systematically manage customer inquiries, track aging items, identify unassigned requests, and maintain response visibility.

---

### General Work Management View

This dedicated view manages internal work assignments, projects, and tasks.

**Data Display**
A comprehensive table showing all work items with columns:
- **Task ID**: Unique identifier for tracking internal work
- **Description**: Details of the task or project
- **Assigned Engineer**: Team member responsible for completion
- **Status**: Current state (Not Started, In Progress, Completed, On Hold)
- **Priority**: Importance level (High, Medium, Low)
- **Due Date**: Target completion date with visual warning for approaching deadlines
- **Progress**: Percentage completed or visual progress indicator
- **Actions**: Buttons for editing, status updates, or deletion

**Filtering System**
Multiple filter options to organize work queue:
- **Status Filter**: View items in specific state categories
- **Priority Filter**: Focus on high-priority items first
- **Engineer Filter**: Filter by assigned team member
- **Date Range Filter**: Show items due within timeframe

**Interaction Patterns**
- Click to sort table by any column
- Apply filters to create custom work views
- Click progress field to update percentage complete
- Select engineer from dropdown to assign or reassign task
- Click status dropdown to advance task through workflow
- Use date picker to set or modify due dates
- Click delete button with confirmation to remove completed tasks

**Pagination**
Navigate through work items with pagination controls and adjustable items per page.

**Export Capability**
Work list can be exported:
- To Excel for spreadsheet analysis or distribution
- To PDF for documentation
- Generated reports included in email

**Purpose**
This view consolidates all work assignments, enabling engineers to manage their task queue, track priorities, and maintain visibility of deadlines.

---

### Quotation Tracking View

Dedicated view for monitoring the quotation pipeline from creation to closure.

**Data Display**
Table showing quotation records with columns:
- **Quote ID**: Unique quotation identifier
- **Customer**: Requesting company name
- **Enquiry Reference**: Link to source customer enquiry
- **Amount**: Quote value in currency
- **Status**: Current stage (Draft, Sent, Accepted, Rejected, Expired)
- **Created Date**: When quotation was generated
- **Expected Close Date**: Target decision date or deadline
- **Actions**: Buttons for editing, updating, or tracking

**Filtering System**
Options to focus on specific quotation states:
- **Status Filter**: View quotations in specific stage
- **Date Range Filter**: Show quotes created or due within timeframe
- **Search Function**: Find specific quotations by ID or customer

**Interaction Patterns**
- Sort by any column using column header
- Apply filters to segment pipeline
- Update status to advance quotation lifecycle
- Edit amounts or dates for pending quotes
- Track days open for aging analysis
- Generate follow-up alerts for aging quotations

**Pagination**
Navigate quotation records with pagination controls.

**Export Capability**
Quotation data can be:
- Exported to Excel for analysis or CRM upload
- Exported to PDF for distribution
- Included in email reports

**Purpose**
This view provides visibility into quotation pipeline health, enabling engineers and managers to track quote conversion and identify aging opportunities.

---

### Reports View

Comprehensive reporting module providing analytical summaries and data exports.

**Report Types Available**

**1. Pending Enquiry Report**
Lists all customer enquiries awaiting response with:
- Reference, Customer, Product, Status, Age, Assigned Engineer, Last Update
- Identifies which enquiries require immediate attention
- Used for daily standup reviews and workload assessment

**2. Quotation Status Report**
Shows quotation distribution across pipeline stages:
- Quote ID, Customer, Amount, Status, Created Date, Days Open
- Identifies stalled opportunities requiring follow-up
- Used for pipeline health monitoring

**3. Delayed Enquiry Report**
Highlights enquiries exceeding response time thresholds:
- Reference, Customer, Product, Days Delayed, Assigned Engineer, Last Contact
- Flags critical items for escalation
- Used for quality assurance and customer satisfaction management

**4. Pending Ownership Report**
Shows enquiries without assigned responsibility:
- Reference, Customer, Product, Days Pending, Status
- Identifies work needing assignment
- Used for workload distribution planning

**5. General Work Report**
Summarizes all work items and their status:
- Task ID, Description, Assigned Engineer, Status, Priority, Days Remaining, Progress
- Used for project and workload tracking
- Enables capacity planning assessment

**6. Monthly Performance Report**
Shows engineer productivity and KPIs by month:
- Month, Enquiries Handled, Quotations Generated, Average Response Time, Completion Rate, Engineer Name
- Used for performance evaluation and incentive tracking
- Identifies high performers and bottlenecks

**Report Workflow**

1. **Select Report Type**: Click button to choose desired report template
2. **Apply Filters**: Set date range, status filters, or other parameters
3. **View Report**: System generates and displays data in formatted table
4. **Export Report**: Choose export format (PDF or Excel)
5. **Send Report**: Email report directly to recipients or download locally

**Filter Capabilities**
All reports support dynamic filtering:
- Date range selection to limit data period
- Status filter to focus on specific categories
- Search function to find particular records
- Custom filters based on report type

**Export Options**
Reports can be extracted in multiple formats:
- **Excel Export**: Preserves data in spreadsheet format for further analysis
- **PDF Export**: Creates formatted document with header, title, and timestamp
- **Email Export**: Opens email client with report generated and ready to attach

**Purpose**
Reports module provides aggregated analytics and export capabilities for internal analysis, management reviews, customer reporting, and data archival.

---

### Settings View

Personal preference and application configuration settings.

**Theme Preferences**
- **Light Mode**: Standard white background with dark text
- **Dark Mode**: Dark background with light text, reduced eye strain for extended use
- Toggle between themes with immediate visual application

**Notification Preferences**
Settings for notification delivery:
- Enable/disable email notifications for key events
- Configure notification frequency
- Set quiet hours if applicable

**Default Preferences**
- Set default view (Dashboard vs. other views)
- Configure default filters for recurring tasks
- Adjust session timeout settings

**Purpose**
Settings allow individual engineers to customize interface appearance and behavior per their preferences, improving usability and accessibility.

---

## Notification System

**Location**: Top-right header area with bell icon

**Features**:
- Notification badge showing count of unread notifications
- Expandable dropdown panel with scrollable notification list
- Each notification shows:
  - Type label (color-coded by category)
  - Message content
  - Timestamp of when notification was generated
  - Unread indicator (green background for unread items)

**Notification Categories**:
- Enquiry updates (new customer requests, responses)
- Quotation status changes
- Task assignment or completion
- Deadline approaching alerts
- System notifications

**Interactions**:
- Click bell icon to expand/collapse notification panel
- Click individual notification to navigate to related record
- Clicking a notification marks it as read
- Notifications persist across session for reference

**Purpose**:
The notification system provides real-time alerts about important activities and changes without requiring engineers to constantly refresh views.

---

## Search Functionality

**Location**: Central header search bar

**Capabilities**:
- Global full-text search across all modules
- Search by reference number, customer name, product, or engineer name
- Real-time search as user types
- Results include record type and summary information
- Click result to navigate directly to record

**Purpose**:
Enables quick access to specific records without navigating through filters and lists.

---

## Theme and Display System

**Light Mode (Default)**:
- White background for primary content
- Green accent color (#10b981) for primary actions and highlights
- Dark gray text for readability
- Suitable for well-lit environments

**Dark Mode**:
- Dark gray/black background (#111827) for reduced eye strain
- Lighter accent color (#34d399) for contrast
- Light gray text for visibility
- Suitable for low-light environments or extended use

**Responsive Design**:
- Application adjusts layout for mobile devices
- Sidebar collapses to hamburger menu on small screens
- Tables become horizontal scrollable on narrow viewports
- Buttons and touch targets scale for touch interaction

---

## Data Export and Reporting

**Export Formats Supported**:

**Excel (.xlsx)**
- Preserves formatting including header rows
- Includes all visible columns from selected table
- Can be opened in spreadsheet applications for further analysis
- Maintains data structure for re-import to other systems

**PDF**
- Creates formatted document with report title and generation date
- Includes full table with header and all data rows
- Suitable for printing or email distribution
- Preserves visual formatting

**Email Integration**
- Opens system email client with generated report as attachment
- Pre-populates subject line based on report type
- Enables direct distribution to recipients
- Combines file generation and sending in single action

**Purpose**:
Export capabilities enable engineers to:
- Share data with colleagues and managers
- Create permanent records for compliance
- Perform additional analysis in external tools
- Distribute reports to customers or stakeholders

---

## User Interactions and Workflows

The application supports multiple interaction patterns:

**Viewing Data**:
- Tables display structured information with sortable columns
- Click headers to sort ascending/descending
- Hover over rows to see action buttons
- Click row to view full record details

**Filtering Data**:
- Use filter dropdowns to select specific values
- Use date pickers for date range selection
- Use search box for text matching
- Click "Apply Filters" to execute filtered view
- Click "Clear Filters" to reset

**Modifying Data**:
- Click edit icon to open record for modification
- Inline editing for simple fields like status or priority
- Dropdown selections for categories
- Date picker for date fields
- Save or cancel changes

**Assigning Work**:
- Click engineer dropdown in table
- Select from list of available engineers
- Assignment automatically updates record
- Notification sent to assigned engineer

**Exporting Data**:
- Select records or table using filters
- Click export button
- Choose format (PDF or Excel)
- File downloads or email opens for sending
- Can be repeated for different report types

---

## Data Display and Organization

**Key Display Principles**:
- Large numeric values for KPIs enable quick scanning
- Color coding provides immediate status indicators
- Trend indicators (up/down) show direction of change
- Tables organize detailed data in scannable format
- Charts visualize trends and distributions
- Filters enable focusing on relevant subset of data

**Status and State Indicators**:
- **Green**: Positive trend or normal status
- **Orange/Yellow**: Warning or attention needed
- **Red**: Critical or delayed status
- **Gray**: Neutral or historical status

**Time-based Indicators**:
- "Age (Days)" columns show duration in pending state
- "Last Update" shows recency of activity
- "Due Date" shows approaching deadlines
- Color warns when approaching or past due

---

## Performance and Technical Considerations

**Data Load Performance**:
- Tables implement pagination to limit records shown
- Filter application reduces data size before display
- Charts render efficiently using Chart.js library
- Responsive design maintains usability on various devices

**Export Performance**:
- Excel export uses XLSX library for client-side generation
- PDF export uses html2pdf for client-side rendering
- Email integration uses system mailto protocol
- Large datasets may require filtering before export

**Storage and State**:
- Application maintains state during current session
- Filters and view selections persist within session
- Refresh resets to defaults
- No persistent local storage of sensitive data

---

## System Integration Points

**External Integrations**:
- Email client integration for report distribution
- File system for downloading exports
- Theme persistence (implied through localStorage)
- Notification system (implied for real-time updates)

**Data Sources** (Implied):
- Backend API for fetching enquiry data
- Backend API for work item data
- Backend API for quotation data
- Real-time updates for notifications

---

## Security and Access Control

**Implied Security Features**:
- Role-based view filtering (Application Engineer vs. Manager vs. MD)
- User authentication with profile badge
- Session management with logout capability
- Data scoping to user role and assignment

**Role-Based Visibility**:
- **Application Engineers**: See assigned enquiries, quotations, and work items
- **Managers**: See team member assignments and performance
- **MD/Executives**: See company-wide metrics and consolidated reports

---

## Accessibility and Usability

**Usability Features**:
- Keyboard navigation support for accessibility
- High contrast ratios for readability
- Logical tab order through form fields
- Clear labels for all input fields
- Error messages for validation (implied)

**Mobile Responsiveness**:
- Hamburger menu for small screens
- Touch-friendly button sizes (minimum 44px)
- Responsive table layout adjusts for narrow viewports
- Simplified menu on mobile devices

---

## Data Validation and Integrity

The system enforces data integrity through:
- Dropdown selections preventing invalid inputs
- Date pickers ensuring valid date formats
- Required field validation (implied)
- Confirmation dialogs for destructive actions like deletion
- Status workflow constraints (certain status transitions not permitted)

---

## Complete User Journey

### New User First Login
1. User logs in with credentials
2. System displays dashboard as default landing page
3. User sees KPI cards summarizing current workload
4. User can explore navigation sidebar
5. User can access settings to configure preferences

### Daily Operations Flow
1. User logs in and views dashboard
2. Checks Pending Enquiries KPI for new requests
3. Navigates to Pending Enquiry view to see details
4. Filters enquiries by status to find those needing response
5. Assigns new enquiries to appropriate engineers using dropdown
6. Updates enquiry status as work progresses
7. Checks General Work view for task assignments
8. Updates task progress and status
9. Monitors Quotation view for pipeline
10. Generates reports for management review
11. Exports data as needed for sharing

### Weekly Report Generation
1. User navigates to Reports section
2. Selects specific report type (e.g., Weekly Performance)
3. Applies date range filter for the week
4. Views generated report with all relevant metrics
5. Applies status filters if needed to drill into specifics
6. Exports report to PDF or Excel
7. Emails report to manager or stakeholder

### Month-End Review
1. User generates Monthly Performance Report
2. Applies filters to show full month's data
3. Reviews metrics for all engineers on team
4. Exports to Excel for spreadsheet analysis
5. Uses data to prepare management presentation
6. Archives PDF copy for compliance records

---

## Summary

The Villva ERP Application Engineer Workspace is a purpose-built operations dashboard that consolidates visibility of customer enquiry management, work assignment tracking, quotation pipeline management, and performance analytics. Through intuitive navigation, flexible filtering, real-time KPI monitoring, and comprehensive export capabilities, the system enables Application Engineers to manage their responsibilities while providing managers and executives with the visibility needed for effective oversight and decision-making. The application emphasizes usability, accessibility, and responsive design while maintaining security through role-based access control.
