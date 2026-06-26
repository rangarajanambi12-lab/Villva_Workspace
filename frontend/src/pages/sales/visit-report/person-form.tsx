import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DESIGNATIONS, DEPARTMENTS, OUTCOMES } from "@/lib/constants";
import { X } from "lucide-react";

interface PersonFormProps {
  title: string;
  onRemove?: () => void;
  onChange: (data: any) => void;
}

export function PersonForm({ title, onRemove, onChange }: PersonFormProps) {
  const [data, setData] = useState({
    personName: "",
    designation: "",
    department: "",
    mobile: "",
    email: "",
    outcome: [] as string[],
    keyFactor: "",
    nextAction: "",
    requirement: "",
  });

  useEffect(() => {
    // Basic validation to see if form has enough data to be "complete"
    if (data.personName && data.mobile) {
      onChange(data);
    } else {
      onChange(null);
    }
  }, [data, onChange]);

  const handleChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleOutcomeChange = (outcome: string, checked: boolean) => {
    setData(prev => {
      const newOutcomes = checked 
        ? [...prev.outcome, outcome]
        : prev.outcome.filter(o => o !== outcome);
      return { ...prev, outcome: newOutcomes };
    });
  };

  return (
    <Card className="border-primary/20 shadow-sm relative overflow-hidden">
      {onRemove && (
        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute right-2 top-2 h-8 w-8 rounded-full" 
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardHeader className="bg-muted/30 pb-4 border-b">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Person Name <span className="text-destructive">*</span></Label>
            <Input placeholder="Enter name" value={data.personName} onChange={e => handleChange("personName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mobile Number <span className="text-destructive">*</span></Label>
            <Input type="tel" placeholder="10 digit number" value={data.mobile} onChange={e => handleChange("mobile", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter email" value={data.email} onChange={e => handleChange("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Designation</Label>
            <Select value={data.designation} onValueChange={v => handleChange("designation", v)}>
              <SelectTrigger><SelectValue placeholder="Select Designation" /></SelectTrigger>
              <SelectContent>
                {DESIGNATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={data.department} onValueChange={v => handleChange("department", v)}>
              <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Label>Outcome (Select Multiple)</Label>
          <div className="flex flex-wrap gap-4">
            {OUTCOMES.map(outcome => (
              <div key={outcome} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${title}-${outcome}`} 
                  checked={data.outcome.includes(outcome)}
                  onCheckedChange={(checked) => handleOutcomeChange(outcome, checked as boolean)}
                />
                <label htmlFor={`${title}-${outcome}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {outcome}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <Label>Key Factor</Label>
            <Input placeholder="Enter key factor" value={data.keyFactor} onChange={e => handleChange("keyFactor", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Next Action</Label>
            <Input placeholder="Enter next action" value={data.nextAction} onChange={e => handleChange("nextAction", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label>Remarks / Requirements</Label>
          <Textarea placeholder="Enter remarks" className="min-h-[80px]" value={data.requirement} onChange={e => handleChange("requirement", e.target.value)} />
        </div>

        <div className="space-y-2 pt-2 border-t mt-4 border-dashed pt-4">
          <Label>Upload Visiting Card</Label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/20">
            <Input type="file" accept=".jpg,.jpeg,.png,.pdf" className="max-w-xs" />
            <p className="text-xs text-muted-foreground mt-2">Upload .jpg, .png, or .pdf (Max 5MB)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
