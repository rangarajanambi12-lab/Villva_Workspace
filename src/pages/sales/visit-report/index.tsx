import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomerStore } from "@/stores/customer-store";
import { useFeedbackStore } from "@/stores/feedback-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TAMIL_NADU_DISTRICTS } from "@/lib/constants";
import { PersonForm } from "./person-form";
import { format } from "date-fns";

export function VisitReportPage() {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const navigate = useNavigate();
  
  const { customers, updateCustomer } = useCustomerStore();
  const { addReport } = useFeedbackStore();
  
  const customer = customers.find(c => c.id === customerId);

  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [industry, setIndustry] = useState("");
  
  const [personCount, setPersonCount] = useState(1);
  const [person1, setPerson1] = useState<any>(null);
  const [person2, setPerson2] = useState<any>(null);
  const [person3, setPerson3] = useState<any>(null);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-bold mb-4">Customer not found</h2>
        <Button onClick={() => navigate("/sales/weekly-cam")}>Return to Weekly CAM</Button>
      </div>
    );
  }

  const handleSave = () => {
    if (!person1) {
      alert("Please complete Person 1 details");
      return;
    }
    
    // Save report
    addReport({
      taskId: customer.id,
      date: format(new Date(), "yyyy-MM-dd"),
      customer: customer.customer,
      district,
      industry,
      address,
      person1,
      person2: personCount >= 2 ? person2 : undefined,
      person3: personCount >= 3 ? person3 : undefined,
      // Legacy flat fields mapping (from Person 1)
      personName: person1.personName,
      mobile: person1.mobile,
      email: person1.email,
      outcome: person1.outcome.join(", "),
    });
    
    // Mark task as completed
    updateCustomer(customer.id, { status: "completed" });
    
    navigate("/sales/weekly-cam");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Add Visit Report</h1>
        <p className="text-muted-foreground">
          Record feedback for {customer.customer}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visit Details</CardTitle>
          <CardDescription>General information about the visit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date of Visit</Label>
              <Input value={format(new Date(), "dd/MM/yyyy")} disabled />
            </div>
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input value={customer.customer} disabled />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Input placeholder="Enter full address" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {TAMIL_NADU_DISTRICTS.map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type of Industry</Label>
              <Input placeholder="Enter industry" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <PersonForm 
        title="Person 1 (Primary Contact)" 
        onChange={setPerson1} 
      />

      {personCount >= 2 && (
        <PersonForm 
          title="Person 2 (Optional)" 
          onRemove={() => setPersonCount(1)}
          onChange={setPerson2} 
        />
      )}

      {personCount >= 3 && (
        <PersonForm 
          title="Person 3 (Optional)" 
          onRemove={() => setPersonCount(2)}
          onChange={setPerson3} 
        />
      )}

      {personCount < 3 && (
        <Button 
          variant="outline" 
          className="w-full border-dashed"
          onClick={() => setPersonCount(prev => prev + 1)}
        >
          ➕ Add Person {personCount + 1} (Optional)
        </Button>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => navigate("/sales/weekly-cam")}>Cancel</Button>
        <Button onClick={handleSave}>Save Feedback</Button>
      </div>
    </div>
  );
}
