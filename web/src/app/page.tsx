"use client";

import { useState, useEffect } from "react";

interface SnapWindow extends Window {
  snap?: { embed: (token: string, options: { embedId: string }) => void };
}

export default function Home() {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", myMidtransClientKey as string);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      });
      const data = await response.json();

      (window as SnapWindow).snap!.embed(data.data.transaction.token, {
        embedId: "snap-container",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex justify-center min-h-screen items-center">
      <div id="snap-container" className="fixed"></div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="grid grid-cols-[100px_1fr] items-center">
            <label htmlFor="itemId">Item ID</label>
            <input
              type="text"
              id="itemId"
              value={itemId}
              placeholder="Input your item ID here"
              onChange={(e) => setItemId(e.target.value)}
              className="border border-black py-2 px-4"
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="border border-black py-2 px-4"
            />
          </div>

          <button
            type="submit"
            className="border border-black mt-4 p-4 text-white bg-gray-900"
          >
            Check Out
          </button>
        </form>
      </div>
    </main>
  );
}
