import { useEffect, useState } from "react";
import {
  Smartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  Lock,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

/* =========================================================
   COPY
========================================================= */

const COPY = {
  en: {
    badge: "Test mode",
    secure: "Demo secure checkout",
    payingTo: "Paying to",
    amountPayable: "Amount payable",
    baseAmount: "Amount",
    convenienceFee: "Convenience fee",
    total: "Total",
    choosePayment: "Choose a payment method",
    upi: "UPI",
    card: "Card",
    netbanking: "Netbanking",
    upiIdLabel: "UPI ID",
    upiPlaceholder: "yourname@upi",
    verifyAndPay: "Verify & Pay",
    cardNumberLabel: "Card number",
    cardNameLabel: "Name on card",
    cardNamePlaceholder: "As printed on the card",
    expiryLabel: "Expiry (MM/YY)",
    cvvLabel: "CVV",
    payButton: "Pay",
    bankLabel: "Select your bank",
    chooseBank: "Choose a bank",
    otherBank: "Other banks",
    processing: "Processing your payment…",
    processingHint: "This is a demo gateway — please wait a moment.",
    success: "Payment successful",
    successDetail: "This demo payment was recorded locally. No real money was charged.",
    paymentId: "Payment ID",
    amountPaid: "Amount paid",
    method: "Method",
    continueBtn: "Continue",
    cancel: "Cancel",
    close: "Close",
    testHint: "Demo mode — no real payment gateway is contacted and no money is charged.",
    demoUpiHint: "Try: demo@upitest",
    demoCardHint: "Try: 4111 1111 1111 1111 · any future expiry · any CVV",
    invalidUpi: "Enter a valid UPI ID, e.g. name@bank",
    invalidCardNumber: "Enter a valid 16-digit card number",
    invalidCardName: "Enter the name on the card",
    invalidExpiry: "Enter expiry as MM/YY",
    invalidCvv: "Enter a 3-digit CVV",
    invalidBank: "Select a bank to continue",
  },
  hi: {
    badge: "टेस्ट मोड",
    secure: "डेमो सुरक्षित चेकआउट",
    payingTo: "भुगतान प्राप्तकर्ता",
    amountPayable: "देय राशि",
    baseAmount: "राशि",
    convenienceFee: "सुविधा शुल्क",
    total: "कुल",
    choosePayment: "भुगतान का तरीका चुनें",
    upi: "यूपीआई",
    card: "कार्ड",
    netbanking: "नेटबैंकिंग",
    upiIdLabel: "यूपीआई आईडी",
    upiPlaceholder: "yourname@upi",
    verifyAndPay: "सत्यापित करें और भुगतान करें",
    cardNumberLabel: "कार्ड नंबर",
    cardNameLabel: "कार्ड पर नाम",
    cardNamePlaceholder: "कार्ड पर छपा नाम",
    expiryLabel: "समाप्ति (MM/YY)",
    cvvLabel: "सीवीवी",
    payButton: "भुगतान करें",
    bankLabel: "अपना बैंक चुनें",
    chooseBank: "बैंक चुनें",
    otherBank: "अन्य बैंक",
    processing: "आपका भुगतान संसाधित किया जा रहा है…",
    processingHint: "यह एक डेमो गेटवे है — कृपया प्रतीक्षा करें।",
    success: "भुगतान सफल",
    successDetail: "यह डेमो भुगतान स्थानीय रूप से दर्ज किया गया। कोई वास्तविक राशि नहीं ली गई।",
    paymentId: "भुगतान आईडी",
    amountPaid: "भुगतान की गई राशि",
    method: "तरीका",
    continueBtn: "जारी रखें",
    cancel: "रद्द करें",
    close: "बंद करें",
    testHint: "डेमो मोड — किसी वास्तविक भुगतान गेटवे से संपर्क नहीं किया जाता और कोई राशि नहीं ली जाती।",
    demoUpiHint: "आज़माएं: demo@upitest",
    demoCardHint: "आज़माएं: 4111 1111 1111 1111 · कोई भी भविष्य की समाप्ति तिथि · कोई भी सीवीवी",
    invalidUpi: "एक वैध यूपीआई आईडी दर्ज करें, जैसे name@bank",
    invalidCardNumber: "एक वैध 16-अंकों का कार्ड नंबर दर्ज करें",
    invalidCardName: "कार्ड पर नाम दर्ज करें",
    invalidExpiry: "समाप्ति MM/YY के रूप में दर्ज करें",
    invalidCvv: "3 अंकों का सीवीवी दर्ज करें",
    invalidBank: "जारी रखने के लिए एक बैंक चुनें",
  },
};

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Kotak Mahindra Bank",
];

const formatRupees = (value) => `₹${new Intl.NumberFormat("en-IN").format(value)}`;

function formatCardNumber(raw) {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function generatePaymentId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 14; i += 1) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `txn_${id}`;
}

/* =========================================================
   MOCK CHECKOUT MODAL
========================================================= */

/**
 * A fake, fully client-side Razorpay-style checkout screen. Nothing here
 * talks to a real payment gateway or moves real money — it exists purely
 * to demo a "pay before you submit" flow for paid-looking services
 * (challans, permit fees, checkpost tax) in this hackathon clone.
 *
 * Props:
 *  - open: boolean
 *  - lang: "en" | "hi"
 *  - merchantName: string shown as "Paying to"
 *  - purpose: string, e.g. "Traffic challan payment"
 *  - referenceLabel: optional string, e.g. "Challan No. TC-2026-004821"
 *  - amount: base amount in whole rupees
 *  - feeAmount: optional convenience fee in whole rupees (default 0)
 *  - onSuccess(receipt): called once the user clicks "Continue" on the
 *    success screen. receipt = { id, method, amount, purpose, timestamp }
 *  - onClose(): called when the modal is dismissed without paying
 */
export default function MockCheckout({
  open,
  lang = "en",
  merchantName,
  purpose,
  referenceLabel,
  amount,
  feeAmount = 0,
  onSuccess,
  onClose,
}) {
  const copy = COPY[lang] || COPY.en;

  const [method, setMethod] = useState("upi");
  const [stage, setStage] = useState("form"); // form | processing | success
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState("");

  const total = amount + feeAmount;

  // Reset internal state each time the modal is (re)opened for a new payment.
  useEffect(() => {
    if (!open) return;
    setMethod("upi");
    setStage("form");
    setError("");
    setReceipt(null);
    setUpiId("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    setBank("");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function handleKey(event) {
      if (event.key === "Escape" && stage !== "processing") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, stage, onClose]);

  if (!open) return null;

  function runPayment() {
    setError("");
    setStage("processing");

    setTimeout(() => {
      const newReceipt = {
        id: generatePaymentId(),
        method,
        amount: total,
        purpose,
        timestamp: new Date().toISOString(),
      };
      setReceipt(newReceipt);
      setStage("success");
    }, 1300);
  }

  function handleUpiSubmit(event) {
    event.preventDefault();
    if (!/^[\w.+-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())) {
      setError(copy.invalidUpi);
      return;
    }
    runPayment();
  }

  function handleCardSubmit(event) {
    event.preventDefault();
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError(copy.invalidCardNumber);
      return;
    }
    if (!cardName.trim()) {
      setError(copy.invalidCardName);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setError(copy.invalidExpiry);
      return;
    }
    if (!/^\d{3}$/.test(cardCvv)) {
      setError(copy.invalidCvv);
      return;
    }
    runPayment();
  }

  function handleBankSubmit(event) {
    event.preventDefault();
    if (!bank) {
      setError(copy.invalidBank);
      return;
    }
    runPayment();
  }

  function handleContinue() {
    onSuccess?.(receipt);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label={copy.close}
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={() => stage !== "processing" && onClose?.()}
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl grid sm:grid-cols-[1fr_1.3fr]">
        {stage !== "processing" && (
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/80 text-white hover:bg-navy-950 focus-ring"
          >
            <X size={18} />
          </button>
        )}

        {/* Order summary panel */}
        <div className="relative bg-navy-950 px-6 py-8 text-white sm:px-7 sm:py-9">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 85% 10%, rgba(51,139,255,0.35), transparent 20rem)",
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-blue-100">
              <ShieldCheck size={13} /> {copy.badge}
            </span>

            <p className="mt-5 text-xs text-blue-200">{copy.secure}</p>

            <p className="mt-4 text-xs text-blue-200">{copy.payingTo}</p>
            <p className="text-base font-semibold">{merchantName}</p>

            <p className="mt-4 text-sm text-blue-100">{purpose}</p>
            {referenceLabel && (
              <p className="mt-1 text-xs text-blue-300">{referenceLabel}</p>
            )}

            <div className="mt-7 space-y-2 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between text-blue-100">
                <span>{copy.baseAmount}</span>
                <span>{formatRupees(amount)}</span>
              </div>
              {feeAmount > 0 && (
                <div className="flex items-center justify-between text-blue-100">
                  <span>{copy.convenienceFee}</span>
                  <span>{formatRupees(feeAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-white/10 pt-2 text-base font-bold">
                <span>{copy.total}</span>
                <span>{formatRupees(total)}</span>
              </div>
            </div>

            <p className="mt-8 flex items-center gap-1.5 text-[0.7rem] text-blue-300">
              <Lock size={12} /> {copy.testHint}
            </p>
          </div>
        </div>

        {/* Payment panel */}
        <div className="px-6 py-8 sm:px-7 sm:py-9">
          {stage === "processing" && (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
              <Loader2 size={36} className="animate-spin text-navy-800" />
              <p className="font-semibold text-navy-950">{copy.processing}</p>
              <p className="text-sm text-slate-500">{copy.processingHint}</p>
            </div>
          )}

          {stage === "success" && receipt && (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-6 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={30} />
              </span>

              <p className="text-lg font-semibold text-navy-950">{copy.success}</p>
              <p className="text-sm text-slate-500">{copy.successDetail}</p>

              <dl className="mt-2 w-full max-w-xs space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">{copy.paymentId}</dt>
                  <dd className="font-mono text-xs font-semibold text-navy-950">
                    {receipt.id}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">{copy.amountPaid}</dt>
                  <dd className="font-semibold text-navy-950">
                    {formatRupees(receipt.amount)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">{copy.method}</dt>
                  <dd className="font-semibold uppercase text-navy-950">
                    {receipt.method}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={handleContinue}
                className="button-primary mt-2 w-full max-w-xs focus-ring"
              >
                {copy.continueBtn}
              </button>
            </div>
          )}

          {stage === "form" && (
            <>
              <p className="text-sm font-semibold text-navy-950">
                {copy.choosePayment}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
                {[
                  { id: "upi", label: copy.upi, icon: Smartphone },
                  { id: "card", label: copy.card, icon: CreditCard },
                  { id: "netbanking", label: copy.netbanking, icon: Landmark },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setMethod(tab.id);
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                      method === tab.id
                        ? "bg-white text-navy-950 shadow-sm"
                        : "text-slate-500 hover:text-navy-800"
                    }`}
                  >
                    <tab.icon size={15} /> {tab.label}
                  </button>
                ))}
              </div>

              {method === "upi" && (
                <form onSubmit={handleUpiSubmit} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                    {copy.upiIdLabel}
                    <input
                      className="form-input"
                      placeholder={copy.upiPlaceholder}
                      value={upiId}
                      onChange={(event) => setUpiId(event.target.value)}
                    />
                  </label>
                  <p className="text-xs text-slate-500">{copy.demoUpiHint}</p>
                  <button type="submit" className="button-primary focus-ring">
                    {copy.verifyAndPay} · {formatRupees(total)}
                  </button>
                </form>
              )}

              {method === "card" && (
                <form onSubmit={handleCardSubmit} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                    {copy.cardNumberLabel}
                    <input
                      className="form-input"
                      placeholder="4111 1111 1111 1111"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(event) =>
                        setCardNumber(formatCardNumber(event.target.value))
                      }
                    />
                  </label>

                  <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                    {copy.cardNameLabel}
                    <input
                      className="form-input"
                      placeholder={copy.cardNamePlaceholder}
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                      {copy.expiryLabel}
                      <input
                        className="form-input"
                        placeholder="MM/YY"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={(event) =>
                          setCardExpiry(formatExpiry(event.target.value))
                        }
                      />
                    </label>

                    <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                      {copy.cvvLabel}
                      <input
                        className="form-input"
                        placeholder="123"
                        inputMode="numeric"
                        type="password"
                        value={cardCvv}
                        onChange={(event) =>
                          setCardCvv(event.target.value.replace(/\D/g, "").slice(0, 3))
                        }
                      />
                    </label>
                  </div>

                  <p className="text-xs text-slate-500">{copy.demoCardHint}</p>
                  <button type="submit" className="button-primary focus-ring">
                    {copy.payButton} · {formatRupees(total)}
                  </button>
                </form>
              )}

              {method === "netbanking" && (
                <form onSubmit={handleBankSubmit} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-navy-950">
                    {copy.bankLabel}
                    <select
                      className="form-input"
                      value={bank}
                      onChange={(event) => setBank(event.target.value)}
                    >
                      <option value="">{copy.chooseBank}</option>
                      {BANKS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                      <option value="other">{copy.otherBank}</option>
                    </select>
                  </label>

                  <button type="submit" className="button-primary focus-ring">
                    {copy.payButton} · {formatRupees(total)}
                  </button>
                </form>
              )}

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
