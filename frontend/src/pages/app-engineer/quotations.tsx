import { useState } from "react";
import { useAppEnggStore, QuotationStatus } from "@/stores/app-engg-store";
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
  'Draft': 'bg-slate-500/20 text-slate-500 hover:bg-slate-500/30',
  'Sent': 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30',
  'Accepted': 'bg-primary/20 text-primary hover:bg-primary/30',
  'Rejected': 'bg-red-500/20 text-red-500 hover:bg-red-500/30',
  'Expired': 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30',
};

export function QuotationsPage() {
  const { quotations, updateQuotationStatus } = useAppEnggStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredQuotations = quotations.filter((quote) => {
    const matchesSearch = 
      quote.quoteId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.enquiryReference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Quotations</h1>
        <p className="text-muted-foreground">
          Track quotation lifecycle from creation through closure.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Quotation Tracking</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              placeholder="Search quote ID, customer..." 
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Enq Reference</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Expected Close</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[140px]">Change Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No quotations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotations.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium whitespace-nowrap">{quote.quoteId}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={quote.customer}>{quote.customer}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{quote.enquiryReference}</TableCell>
                      <TableCell className="font-semibold">{quote.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="whitespace-nowrap">{quote.createdDate}</TableCell>
                      <TableCell className="whitespace-nowrap">{quote.expectedCloseDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-transparent whitespace-nowrap ${STATUS_COLORS[quote.status] || STATUS_COLORS['Draft']}`}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={quote.status} 
                          onValueChange={(val) => updateQuotationStatus(quote.id, val as QuotationStatus)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Sent">Sent</SelectItem>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Expired">Expired</SelectItem>
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
