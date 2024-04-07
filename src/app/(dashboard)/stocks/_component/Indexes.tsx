import Link from "next/link";
import React from "react";
import IndexCard from "./IndexCard";

type Props = {};

const indexs = [
  {
    id: 1,
    name: "Nifty 50",
    value: 22513.7,
    change: 0.5,
    changeType: "positive",
  },
  {
    id: 2,
    name: "Sensex",
    value: 74248.22,
    change: 0.5,
    changeType: "negative",
  },
  {
    id: 3,
    name: "Bank Nifty",
    value: 48493.05,
    change: 0.5,
    changeType: "positive",
  },
];

function Indexes({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">Index</p>
        <Link className="text-sky-700" href="#">
          All indices
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5">
        {indexs.map((index) => (
          <IndexCard
            key={index.id}
            name={index.name}
            value={index.value}
            change={index.change}
            changeType={index.changeType}
          />
        ))}
      </div>
    </div>
  );
}

export default Indexes;
