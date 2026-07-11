import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "8gBm/:&EnhH.1/q"; // UAT test key — move server-side before production

const EsewaForm = ({price}) => {

  const [taxAmount, setTaxAmount] = useState("10");
  
  const [transactionUuid, setTransactionUuid] = useState(Date.now().toString());
  const [productCode] = useState("EPAYTEST");
  const [signature, setSignature] = useState("");
  const totalAmount=(parseFloat(price)+parseFloat(taxAmount));

  useEffect(() => {
    if (!totalAmount || !transactionUuid || !productCode) {
      setSignature("");
      return;
    }

    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(message, SECRET_KEY);
    setSignature(CryptoJS.enc.Base64.stringify(hash));
  }, [totalAmount, transactionUuid, productCode]);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="font-serif text-xl font-semibold text-neutral-50">
          eSewa Test Payment
        </h2>

        <input type="hidden" name="amount" value={price} />
        <input type="hidden" name="tax_amount" value={taxAmount} />
        <input type="hidden" name="total_amount" value={totalAmount} />
        <input type="hidden" name="product_code" value={productCode} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value="https://developer.esewa.com.np/success"
        />
        <input
          type="hidden"
          name="failure_url"
          value="https://developer.esewa.com.np/failure"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="transaction_uuid" value={transactionUuid} />
        <input type="hidden" name="signature" value={signature} />

        <label className="text-sm font-mono text-neutral-400">
          Amount
          <input
            type="text"
            value={price}
        
            className="mt-1 w-full bg-neutral-800 text-neutral-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label className="text-sm font-mono text-neutral-400">
          Tax amount
          <input
            type="text"
            value={taxAmount}
           
            className="mt-1 w-full bg-neutral-800 text-neutral-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label className="text-sm font-mono text-neutral-400">
          Total amount
          <input
            type="text"
            value={totalAmount}
            
            className="mt-1 w-full bg-neutral-800 text-neutral-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label className="text-sm font-mono text-neutral-400">
          Transaction UUID
          <input
            type="text"
            value={transactionUuid}
          
            placeholder="Type a unique transaction ID"
            className="mt-1 w-full bg-neutral-800 text-neutral-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <div className="text-xs font-mono text-neutral-500 break-all bg-neutral-800 rounded-lg px-3 py-2">
          signature: {signature || "—"}
        </div>

        <button
          type="submit"
          disabled={!signature}
          className="mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-150"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EsewaForm;