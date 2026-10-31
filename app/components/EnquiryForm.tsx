"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BRAND, PRODUCTS } from "../lib/content";
import { Arrow, Phone } from "./Icons";

export function EnquiryForm({
  productName,
  children = "Make an enquiry",
  variant = "green",
}: {
  productName?: string;
  children?: ReactNode;
  variant?: "green" | "white";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const [prepared, setPrepared] = useState(false);
  const id = useId();
  const phone = BRAND.phone.replace(/\D/g, "");
  const open = () => {
    if (!dialog.current || dialog.current.open) return;
    setPrepared(false);
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    dialog.current.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const digits = value("phone").replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(value("phone")) || digits.length < 7 || digits.length > 15) {
      phoneInput.setCustomValidity("Enter a valid phone number, including your country code if needed.");
      phoneInput.reportValidity();
      return;
    }
    const message = [
      "Hello ITI Biotech, I would like to enquire about your products.",
      "",
      `Product: ${value("product")}`,
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `City / district: ${value("city")}`,
      `Required quantity: ${value("quantity")}`,
      ...(value("message") ? ["", `Message: ${value("message")}`] : []),
    ].join("\n");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setPrepared(true);
  };

  return (
    <>
      <div className="enquiry-actions">
        <button type="button" className={`btn ${variant === "white" ? "btn-white" : ""}`} onClick={open} aria-haspopup="dialog">
          <span>{children}</span><span><Arrow /></span>
        </button>
        <a href={`tel:+${phone}`} className={`enquiry-call ${variant === "white" ? "enquiry-call-light" : ""}`}><Phone size={17} />Call us</a>
      </div>
      <dialog
        ref={dialog}
        className="enquiry-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-intro`}
        onClose={() => { document.body.style.overflow = previousOverflow.current; }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
        }}
      >
        <div className="enquiry-dialog-heading">
          <h2 id={`${id}-title`} className="display">Let’s talk growth.</h2>
          <button type="button" className="enquiry-close" onClick={() => dialog.current?.close()} aria-label="Close enquiry form"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button>
        </div>
        <p id={`${id}-intro`} className="enquiry-form-intro">Tell us what you need. Our team can help with pricing, availability and product guidance.</p>
        <form onSubmit={submit} className="enquiry-form">
          <div className="enquiry-fields">
          <label className="enquiry-full">Product
            {productName ? <input name="product" value={productName} readOnly /> : (
              <select name="product" aria-label="Product" defaultValue="" required><option value="" disabled>Select a product</option>{PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}<option value="Help choosing a product">Help me choose a product</option></select>
            )}
          </label>
          <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} pattern={String.raw`.*\S.*`} placeholder="Full name" /></label>
          <label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={25} placeholder="e.g. +91 98765 43210" onChange={(e) => e.currentTarget.setCustomValidity("")} /></label>
          <label>City / district<input name="city" autoComplete="address-level2" required minLength={2} maxLength={100} pattern={String.raw`.*\S.*`} placeholder="Your location" /></label>
          <label>Required quantity<input name="quantity" required maxLength={100} pattern={String.raw`.*\S.*`} placeholder="e.g. 10 bags or 500 kg" /></label>
          <label className="enquiry-full">Message <span className="enquiry-optional">(optional)</span><textarea name="message" maxLength={1000} rows={2} placeholder="Ask about price, delivery or your crop needs..." /></label>
          </div>
          <div className="enquiry-form-footer">
            <p className="enquiry-handoff">Review your message and tap Send in WhatsApp.</p>
            <button type="submit" className="btn"><span>Send on WhatsApp</span><span><Arrow /></span></button>
            {prepared && <p className="enquiry-prepared" role="status">Your WhatsApp message is ready. Complete your enquiry by sending it in WhatsApp.</p>}
          </div>
        </form>
      </dialog>
    </>
  );
}
