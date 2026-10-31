import Image from "next/image";
import { EnquiryForm } from "./EnquiryForm";
import { Wave } from "./Wave";

export function ProductEnquiry({ productName }: { productName?: string }) {
  return (
    <section id="contact" className="catalogue-enquiry band-deep">
      <Image src="/photos/products-sunrise.webp" alt="" fill sizes="100vw" className="object-cover object-[center_65%]" />
      <div className="photo-shade" aria-hidden />
      <Wave fill="var(--page)" shape={1} edge="top" />
      <div className="shell catalogue-enquiry-inner">
        <div><h2 className="display">Need help choosing?</h2><p>Talk to our team about your soil and crop needs.</p></div>
        <EnquiryForm productName={productName} variant="white" />
      </div>
    </section>
  );
}
