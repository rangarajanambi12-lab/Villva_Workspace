import { useState } from "react";
import { useAppEnggStore, EnquiryStatus } from "@/stores/app-engg-store";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const STATUS_COLORS: Record<string, string> = {
  'Pending': 'bg-status-pending/20 text-status-pending hover:bg-status-pending/30',
  'In Progress': 'bg-status-in-progress/20 text-status-in-progress hover:bg-status-in-progress/30',
  'On Hold': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Responded': 'bg-primary/20 text-primary hover:bg-primary/30',
};

const ENGINEERS = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"];

export function PendingEnquiriesPage() {
  const { pendingEnquiries, updateEnquiryStatus, assignEnquiry } = useAppEnggStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredEnquiries = pendingEnquiries.filter((enq) => {
    const matchesSearch = 
      enq.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || enq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pending Enquiries</h1>
        <p className="text-muted-foreground">
          Manage all customer technical enquiries requiring your response.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Enquiry List</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              placeholder="Search reference, customer, product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Responded">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Age (Days)</TableHead>
                  <TableHead>Assigned Engineer</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[140px]">Change Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.sort((a, b) => b.ageDays - a.ageDays).map((enq) => (
                    <TableRow key={enq.id}>
                      <TableCell className="font-medium whitespace-nowrap">{enq.reference}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={enq.customer}>{enq.customer}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={enq.product}>{enq.product}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${enq.ageDays > 7 ? 'text-status-overdue' : ''}`}>
                          {enq.ageDays}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={enq.assignedEngineer || "unassigned"} 
                          onValueChange={(val) => assignEnquiry(enq.id, val)}
                        >
                          <SelectTrigger className="h-8 border-transparent hover:border-input bg-transparent">
                            <SelectValue placeholder="Assign Engineer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned" className="text-muted-foreground italic">Unassigned</SelectItem>
                            {ENGINEERS.map(emp => (
                              <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{enq.lastUpdate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-transparent whitespace-nowrap ${STATUS_COLORS[enq.status] || STATUS_COLORS['Pending']}`}>
                          {enq.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={enq.status} 
                          onValueChange={(val) => updateEnquiryStatus(enq.id, val as EnquiryStatus)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Responded">Responded</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
