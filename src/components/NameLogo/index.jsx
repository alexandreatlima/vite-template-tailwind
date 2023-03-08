import { useState, useEffect } from "react";

export function NameLogo(props) {
  const { product } = props;
  if (!product.creator) {
    return (
      <div className="drop-shadow-lg flex justify-center gap-20 items-center px-16 border-b-2 border-indigo-900 w-9/12 mx-auto p-6">
        <div
          className={`flex justify-center items-center rounded-full w-32 h-32 border-2 border-black p-auto p-auto`}
        >
          <p>Logo</p>
        </div>
      </div>
    );
  }
  if (!product.creator.picture) {
    return (
      <div className="drop-shadow-lg flex justify-center gap-20 items-center px-16 border-b-2 border-indigo-900 w-9/12 mx-auto p-6">
        <h1 className="text-6xl text-indigo-900">{product.name}</h1>
        <div
          className={`flex justify-center items-center rounded-full w-32 h-32 border-2 border-black p-auto p-auto`}
        >
          <p>Logo</p>
        </div>
      </div>
    );
  }
  const fullClassWithBgImg = `rounded-full w-32 h-32 border-2 border-black p-auto bg-[url('${product.creator.picture}')]`;
  return (
    <div className="bg-slate-100 rounded drop-shadow-lg flex justify-center gap-20 items-center px-16 border-b-4 border-indigo-900 w-9/12 mx-auto p-6">
      <h1 className="text-6xl text-indigo-900">{product.name}</h1>
      <div className={fullClassWithBgImg}>
        <img src={product.creator.picture} alt="Logo" className="hidden" />
      </div>
    </div>
  );
}
