import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DIRECTORY_DATA = [
  { name: "Selvaraj", dept: "Plant Team", role: "QA", manager: "Premnath", email: "selvaraj@villva.com", phone: "+91 98765 43210" },
  { name: "Sivakumar", dept: "Plant Team", role: "Worker", manager: "Premnath", email: "sivakumar@villva.com", phone: "+91 98765 43211" },
  { name: "Rajesh", dept: "Plant Team", role: "SCM", manager: "Premnath", email: "rajesh@villva.com", phone: "+91 98765 43212" },
  { name: "ACS", dept: "Plant Team", role: "Admin", manager: "Premnath", email: "acs@villva.com", phone: "+91 98765 43213" },
  { name: "Gopinath", dept: "Plant Team", role: "Worker", manager: "Premnath", email: "gopinath@villva.com", phone: "+91 98765 43214" },
  { name: "Parthipan", dept: "Plant Team", role: "Supervisor", manager: "Premnath", email: "parthipan@villva.com", phone: "+91 98765 43215" },
];

export function PlantDirectory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Directory</h1>
        <p className="text-muted-foreground">
          Employee Master — Read-only contact list for the Plant Team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Master</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Reporting Manager</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DIRECTORY_DATA.map((emp) => (
                  <TableRow key={emp.name}>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell>{emp.dept}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>{emp.manager}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.email}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
