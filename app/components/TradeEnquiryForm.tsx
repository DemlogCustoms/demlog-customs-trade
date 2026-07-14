"use client";

import { useState } from "react";

const attributionFields = ["landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"] as const;

export function TradeEnquiryForm({ lang }: { lang: "en" | "fr" }) {
  const fr = lang === "fr";
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "").trim()) return;
    const params = new URLSearchParams(window.location.search);
    data.set("landing_page", window.location.href);
    data.set("referrer", document.referrer);
    for (const field of ["utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"] as const) data.set(field, params.get(field) || "");
    setSubmitting(true);
    setError(false);
    try {
      const company = String(data.get("company_name") || "").replace(/[\r\n]+/g, " ").trim();
      const product = String(data.get("product") || "").replace(/[\r\n]+/g, " ").trim();
      data.set("subject", fr ? `Nouvelle demande de commerce international — ${company} — ${product}` : `New International Trade Enquiry — ${company} — ${product}`);
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(Array.from(data.entries()).map(([key, value]) => [key, String(value)])).toString() });
      if (!response.ok) throw new Error("Submission failed");
      setSent(true);
      window.dispatchEvent(new CustomEvent("demlog-event", { detail: "trade_enquiry_submit" }));
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) return <div className="success" role="status"><strong>{fr ? "Merci. Votre demande commerciale a été reçue." : "Thank you. Your trade enquiry has been received."}</strong><p>{fr ? "Demlog examinera les renseignements fournis et communiquera avec vous si l’occasion correspond aux produits, aux quantités et aux marchés actuellement considérés." : "Demlog will review the information provided and follow up when the opportunity aligns with the products, quantities and markets currently under consideration."}</p></div>;

  return <form className="lead-form" name={`international-trade-${lang}`} method="POST" action="/__forms.html" data-netlify="true" data-netlify-honeypot="company_url" onSubmit={submit}>
    <input type="hidden" name="form-name" value={`international-trade-${lang}`} />
    <input type="hidden" name="subject" />
    {attributionFields.map(name => <input key={name} type="hidden" name={name} />)}
    <p className="hp"><label>Do not fill<input name="company_url" tabIndex={-1} autoComplete="off" /></label></p>
    <div className="form-grid">
      <label>{fr ? "Nom de la personne-ressource" : "Contact name"}<input name="contact_name" required maxLength={120} autoComplete="name" /></label>
      <label>{fr ? "Nom de l’entreprise" : "Company name"}<input name="company_name" required maxLength={180} autoComplete="organization" /></label>
      <label>{fr ? "Courriel professionnel" : "Work email"}<input name="email" type="email" required maxLength={180} autoComplete="email" /></label>
      <label>{fr ? "Téléphone ou numéro WhatsApp" : "Telephone or WhatsApp number"}<input name="telephone_whatsapp" type="tel" required maxLength={60} autoComplete="tel" /></label>
      <label>{fr ? "Pays de l’acheteur" : "Buyer’s country"}<input name="buyer_country" required maxLength={100} autoComplete="country-name" /></label>
      <label>{fr ? "Produit demandé" : "Product requested"}<select name="product" required defaultValue=""><option value="" disabled>—</option><option value="Green lentils">{fr ? "Lentilles vertes" : "Green lentils"}</option><option value="Red lentils">{fr ? "Lentilles rouges" : "Red lentils"}</option><option value="Chickpeas">{fr ? "Pois chiches" : "Chickpeas"}</option><option value="Yellow peas">{fr ? "Pois jaunes" : "Yellow peas"}</option><option value="Green peas">{fr ? "Pois verts" : "Green peas"}</option><option value="Other Canadian agricultural commodity">{fr ? "Autre produit agricole canadien" : "Other Canadian agricultural commodity"}</option></select></label>
      <label>{fr ? "Quantité requise" : "Required quantity"}<input name="required_quantity" required maxLength={80} inputMode="decimal" /></label>
      <label>{fr ? "Unité de quantité" : "Quantity unit"}<select name="quantity_unit" required defaultValue=""><option value="" disabled>—</option><option value="Metric tonnes">{fr ? "Tonnes métriques" : "Metric tonnes"}</option><option value="Kilograms">{fr ? "Kilogrammes" : "Kilograms"}</option><option value="Containers">{fr ? "Conteneurs" : "Containers"}</option><option value="Other">{fr ? "Autre" : "Other"}</option></select></label>
      <label>{fr ? "Emballage souhaité" : "Preferred packaging"}<input name="preferred_packaging" required maxLength={160} /></label>
      <label>{fr ? "Qualité ou spécifications du produit" : "Product grade or specifications"}<input name="product_specifications" required maxLength={240} /></label>
      <label>{fr ? "Pays de destination" : "Destination country"}<input name="destination_country" required maxLength={100} /></label>
      <label>{fr ? "Port ou ville de destination" : "Destination port or city"}<input name="destination_port_city" required maxLength={140} /></label>
      <label>{fr ? "Incoterm souhaité (facultatif)" : "Preferred Incoterm (optional)"}<select name="preferred_incoterm" defaultValue=""><option value="">—</option>{["EXW", "FCA", "FOB", "CFR", "CIF"].map(term => <option key={term}>{term}</option>)}<option value="Other">{fr ? "Autre" : "Other"}</option><option value="Unsure">{fr ? "Incertain" : "Unsure"}</option></select></label>
      <label>{fr ? "Période d’expédition ou de livraison visée" : "Target shipment or delivery period"}<input name="target_period" required maxLength={120} /></label>
    </div>
    <label>{fr ? "Utilisation commerciale prévue" : "Intended commercial use"}<textarea name="intended_commercial_use" required rows={3} maxLength={1000} /></label>
    <label>{fr ? "Exigences additionnelles" : "Additional requirements"}<textarea name="additional_requirements" rows={5} maxLength={2000} /></label>
    <label className="check"><input type="checkbox" name="consent" required /> {fr ? "J’accepte que Demlog utilise ces renseignements pour évaluer ma demande commerciale et communiquer avec moi. Je confirme qu’il s’agit d’une demande commerciale légitime." : "I consent to Demlog using this information to assess my trade enquiry and contact me. I confirm this is a legitimate commercial enquiry."}</label>
    <button className="button primary" type="submit" disabled={submitting}>{submitting ? (fr ? "Envoi…" : "Submitting…") : (fr ? "Soumettre la demande commerciale" : "Submit trade enquiry")}</button>
    {error && <p className="notice" role="alert">{fr ? "La demande n’a pas pu être transmise. Veuillez écrire à berdan.demirel@demlogct.com ou appeler au +1 514 962-0243." : "The enquiry could not be sent. Please email berdan.demirel@demlogct.com or call +1 514 962-0243."}</p>}
    <p className="form-note">{fr ? "Les demandes sont transmises à berdan.demirel@demlogct.com. Aucun document sensible ne doit être envoyé par ce formulaire." : "Enquiries are directed to berdan.demirel@demlogct.com. Do not send sensitive documents through this form."}</p>
  </form>;
}
