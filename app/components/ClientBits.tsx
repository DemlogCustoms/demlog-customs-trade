"use client";

import { useEffect, useState } from "react";

export function MobileMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>{label}<span aria-hidden>☰</span></button>{open && <div className="mobile-panel" onClick={() => setOpen(false)}>{children}</div>}</div>;
}

export function ConsentBanner({ lang }: { lang: "en" | "fr" }) {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);
  useEffect(() => { const id = window.setTimeout(() => setShow(!localStorage.getItem("demlog-consent")), 0); return () => window.clearTimeout(id); }, []);
  const save = (value: string) => { localStorage.setItem("demlog-consent", value); setShow(false); };
  if (!show) return null;
  return <aside className="consent" aria-label={lang === "en" ? "Cookie preferences" : "Préférences de témoins"}>
    <strong>{lang === "en" ? "Your privacy choices" : "Vos choix de confidentialité"}</strong>
    <p>{lang === "en" ? "Essential storage keeps language and privacy choices. Optional analytics remains off unless you accept it." : "Le stockage essentiel conserve la langue et vos choix. Les outils d’analyse facultatifs restent désactivés sans votre accord."}</p>
    {manage && <label className="check"><input type="checkbox" disabled checked /> {lang === "en" ? "Essential (always active)" : "Essentiels (toujours actifs)"}</label>}
    <div className="consent-actions"><button onClick={() => save("rejected")} className="button secondary">{lang === "en" ? "Reject" : "Refuser"}</button><button onClick={() => setManage(!manage)} className="button secondary">{lang === "en" ? "Manage" : "Gérer"}</button><button onClick={() => save("accepted")} className="button primary">{lang === "en" ? "Accept" : "Accepter"}</button></div>
  </aside>;
}

export function LeadForm({ lang, type = "clearance", compact = false }: { lang: "en" | "fr"; type?: "clearance" | "contact" | "client" | "partner"; compact?: boolean }) {
  const fr = lang === "fr";
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    if (String(data.get("company_url") || "").trim()) return;
    const params = new URLSearchParams(window.location.search);
    data.set("landing_page", window.location.href);
    data.set("referrer", document.referrer);
    data.set("utm_source", params.get("utm_source") || "");
    data.set("gclid", params.get("gclid") || "");
    setSubmitting(true);
    setError(false);
    try {
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(Array.from(data.entries()).map(([key, value]) => [key, String(value)])).toString() });
      if (!response.ok) throw new Error("Submission failed");
      setSent(true);
      window.dispatchEvent(new CustomEvent("demlog-event", { detail: "generate_lead" }));
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };
  if (sent) return <div className="success" role="status"><strong>{fr ? "Merci. Votre demande a été transmise." : "Thank you. Your request has been submitted."}</strong><p>{fr ? "Demlog examinera les renseignements fournis et communiquera avec vous sous peu." : "Demlog will review the information provided and contact you shortly."}</p></div>;
  return <form className={`lead-form ${compact ? "compact" : ""}`} name={`${type}-${lang}`} method="POST" action="/__forms.html" data-netlify="true" data-netlify-honeypot="company_url" onSubmit={submit}>
    <input type="hidden" name="form-name" value={`${type}-${lang}`} /><input type="hidden" name="landing_page" /><input type="hidden" name="referrer" /><input type="hidden" name="utm_source" /><input type="hidden" name="gclid" />
    <p className="hp"><label>Do not fill<input name="company_url" tabIndex={-1} autoComplete="off" /></label></p>
    <div className="form-grid"><label>{fr ? "Nom" : "Name"}<input name="name" required autoComplete="name" /></label><label>{fr ? "Entreprise" : "Company"}<input name="company" required={type !== "contact"} autoComplete="organization" /></label><label>{fr ? "Courriel professionnel" : "Work email"}<input name="email" type="email" required autoComplete="email" /></label><label>{fr ? "Téléphone (facultatif)" : "Telephone (optional)"}<input name="phone" type="tel" autoComplete="tel" /></label></div>
    {type === "clearance" && <><div className="form-grid"><label>{fr ? "Mode de transport" : "Shipment type"}<select name="mode" required><option value="">—</option><option>Highway / Route</option><option>Air</option><option>Ocean / Mer</option><option>Courier / Messagerie</option><option>Unsure / Incertain</option></select></label><label>{fr ? "Pays d’origine" : "Country of origin"}<input name="origin" required /></label><label>{fr ? "Destination canadienne" : "Canadian destination"}<input name="destination" required /></label><label>{fr ? "Arrivée prévue (facultatif)" : "Expected arrival (optional)"}<input name="arrival" type="date" /></label></div><label>{fr ? "Description générale des marchandises" : "General description of goods"}<textarea name="goods" required rows={3} /></label></>}
    {type === "client" && <div className="form-grid"><label>{fr ? "Dénomination sociale" : "Legal company name"}<input name="legal_name" required /></label><label>{fr ? "Statut GCRA" : "CARM status"}<select name="carm"><option>{fr ? "Inscrit" : "Registered"}</option><option>{fr ? "Non inscrit" : "Not registered"}</option><option>{fr ? "Incertain" : "Unsure"}</option></select></label><label>{fr ? "Volume mensuel estimé" : "Estimated monthly volume"}<input name="volume" /></label><label>{fr ? "Date de début souhaitée" : "Desired start date"}<input name="start" type="date" /></label></div>}
    <label>{fr ? "Message" : "Message"}<textarea name="message" rows={compact ? 3 : 5} /></label>
    <label className="check"><input type="checkbox" name="consent" required /> {fr ? "J’accepte que Demlog utilise ces renseignements pour répondre à ma demande. Aucun document douanier sensible ne doit être envoyé ici." : "I consent to Demlog using this information to respond. Do not send sensitive customs documents here."}</label>
    <button className="button primary" type="submit" disabled={submitting}>{submitting ? (fr ? "Envoi…" : "Submitting…") : type === "client" ? (fr ? "Commencer l’intégration" : "Start onboarding") : (fr ? "Envoyer la demande" : "Submit request")}</button>
    {error && <p className="notice" role="alert">{fr ? "La demande n’a pas pu être transmise. Veuillez écrire à berdan.demirel@demlogct.com ou appeler au +1 514 962-0243." : "The request could not be sent. Please email berdan.demirel@demlogct.com or call +1 514 962-0243."}</p>}
    <p className="form-note">{fr ? "Si le formulaire échoue, écrivez à berdan.demirel@demlogct.com ou appelez au +1 514 962-0243." : "If the form fails, email berdan.demirel@demlogct.com or call +1 514 962-0243."}</p>
  </form>;
}

export function ParsTracker({ lang, compact = false }: { lang: "en" | "fr"; compact?: boolean }) {
  const fr = lang === "fr";
  return <div className={`tracker tracker-link ${compact ? "compact" : ""}`}><p className="eyebrow">PARS · PAPS · CCN</p><h2>{fr ? "Consultez l’état de votre expédition" : "Check your shipment status"}</h2><p>{fr ? "Le vérificateur sécurisé de Descartes s’ouvrira dans un nouvel onglet. Vous pourrez y entrer votre numéro PARS, PAPS, NCF ou numéro de transaction." : "The secure Descartes checker will open in a new tab. Enter your PARS, PAPS, cargo control or transaction number there."}</p><a className="button primary" href="https://checker.bfes.descartes.com/" target="_blank" rel="noopener noreferrer">{fr ? "Ouvrir le vérificateur PARS Descartes ↗" : "Open the Descartes PARS checker ↗"}</a></div>;
}
