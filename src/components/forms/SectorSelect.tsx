import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setoresHospitalares } from '@/lib/form-reference';

type SectorSelectProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const SectorSelect = ({ value, onChange, label = 'Setor' }: SectorSelectProps) => (
  <div className="space-y-2">
    <Label>{label} *</Label>
    <Select value={value} onValueChange={onChange} required>
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder="Selecione o setor" />
      </SelectTrigger>
      <SelectContent>
        {setoresHospitalares.map((setor) => <SelectItem key={setor} value={setor}>{setor}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);