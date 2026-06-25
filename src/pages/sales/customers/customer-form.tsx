import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomerStore } from "@/stores/customer-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useState } from "react";

const customerSchema = z.object({
  date: z.string().min(1, "Date is required"),
  customer: z.string().min(2, "Customer name is required"),
  purpose: z.string().min(2, "Purpose is required"),
  location: z.string().min(2, "Location is required"),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerForm({ open, onOpenChange }: CustomerFormProps) {
  const { addCustomer } = useCustomerStore();
  const [formData, setFormData] = useState<CustomerFormValues>({
    date: format(new Date(), "yyyy-MM-dd"),
    customer: "",
    purpose: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      customerSchema.parse(formData);
      addCustomer(formData);
      onOpenChange(false);
      setFormData({
        date: format(new Date(), "yyyy-MM-dd"),
        customer: "",
        purpose: "",
        location: "",
      });
    } catch (error) {
      alert("Please fill all fields correctly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Add a new customer visit to your schedule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                name="customer"
                placeholder="Enter customer name"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                name="purpose"
                placeholder="Enter visit purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter city/district"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
