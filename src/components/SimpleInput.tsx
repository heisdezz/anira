import { Eye } from "lucide-react";
import React, { forwardRef, useState } from "react";

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ label, icon, ...props }, ref) => {
    const [visibility, setVisiblity] = useState(props.type || "text");
    return (
      <div className=" w-full space-y-2 ">
        {label && (
          <div className="label ">
            <span className="text-base">{label}</span>
          </div>
        )}
        <div className="input input-bordered flex items-center gap-2 w-full">
          {icon}
          <input className="grow" {...props} ref={ref} type={visibility} />
          {props.type === "password" && (
            <button
              type="button"
              onClick={() =>
                setVisiblity(visibility === "password" ? "text" : "password")
              }
              className="btn btn-sm btn-square btn-ghost"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>
    );
  },
);

SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
