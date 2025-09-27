import { CircleCheckBig, ClockFading, Hourglass } from 'lucide-react';

interface BadgeStatusProps {
  status: "approved" | "denied" | "pending";
}

export function BadgeStatus({ status }: BadgeStatusProps) {
  return (
    <div
      className={`w-fit px-2 py-1 rounded-full text-white  flex gap-2 items-center
      ${status === "approved" && "bg-green-400"}
      ${status === "denied" && "bg-orange-400"}
      ${status === "pending" && "bg-blue-400"}
    `}
    >
      {status === "approved" && <CircleCheckBig />}
      {status === "pending" && <Hourglass />}
      {status === "denied" && <ClockFading/>}

      {status === "approved" && "Aprovado"}
      {status === "pending" && "Pendente"}
      {status === "denied" && "Rejeitado"}
    </div>
  );
}
