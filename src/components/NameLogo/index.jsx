import { useState, useEffect } from "react";

export function NameLogo(props) {
  const { product } = props;
  if (!product.creator) {
    console.log("There is no product creator");
    console.log(product);
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
    console.log("There is no picture");
    console.log(product);
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
  console.log("Everything is alright. Picture URL bellow:");
  console.log(product.creator.picture);
  const logoUrl = product.creator.picture;
  const fullClassWithBgImg = `rounded-full w-32 h-32 border-2 border-black p-auto bg-[url('${logoUrl}')]`;
  return (
    <div className="bg-slate-100 rounded drop-shadow-lg flex justify-center gap-20 items-center px-16 border-b-4 border-indigo-900 w-9/12 mx-auto p-6">
      <h1 className="text-6xl text-indigo-900">{product.name}</h1>
      <div className={fullClassWithBgImg}>
        <img src={logoUrl} alt="Logo" className="hidden" />
      </div>
    </div>
  );
}
