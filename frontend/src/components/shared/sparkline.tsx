import { ResponsiveContainer, LineChart, Line } from "recharts";

interface SparklineProps {
  data: { value: number }[];
  color: string;
}

export function Sparkline({ data, color }: SparklineProps) {
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
