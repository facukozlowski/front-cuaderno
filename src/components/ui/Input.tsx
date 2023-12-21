import React, { InputHTMLAttributes, forwardRef, Ref } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <input
      type="text"
      className="bg-zinc-800 px-3 py-2 block my-2 w-full"
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(Input);
