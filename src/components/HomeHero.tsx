import Link from "next/link";
import styles from "./HomeHero.module.css";

const measurements = [
  ["Product & dilution", "The right strength for the job."],
  ["Usage & waste", "What you use. What you lose."],
  ["Labor & rework", "The time it takes to get it clean."],
  ["Freight & storage", "The cost beyond the container."],
];

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.local}>
        <span><span className={styles.dot} aria-hidden="true" /> Stocked in Great Falls &amp; Billings</span>
        <span>Direct regional delivery</span>
      </div>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Commercial cleaning. Montana know-how.</p>
          <h1 id="hero-heading">Lower the <em>real cost</em> of cleaning your facility.</h1>
          <p className={styles.description}>Made in Montana, delivered on our own trucks, and priced by the gallon you actually use — not the gallon in the jug.</p>
          <p className={styles.caption}>One 5-gallon pail of Delta Green Professional makes 325 usable gallons. That&#39;s about 37¢ each.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact?request=audit">Request a Free On-Site Cleaning Audit <span aria-hidden="true">↗</span></Link>
            <Link className={styles.secondary} href="/find-a-solution">Find the Right Product <span aria-hidden="true">→</span></Link>
          </div>
          <p className={styles.reassurance}>No obligation. We evaluate your current process first.</p>
        </div>
        <aside className={styles.assessment} aria-label="Our cleaning cost audit process">
          <div className={styles.panelHeader}><span>UNITED FORMULAS / FIELD NOTES</span><span aria-hidden="true">UF—01</span></div>
          <div className={styles.panelIntro}>
            <span className={styles.label}>The cleaning cost audit</span>
            <h2>Better results start<br />with better questions.</h2>
            <p>We come to your facility.<br />We look at the whole operation.</p>
            <p className={styles.auditIntro}>We measure product usage, dilution, labor, and cleaning results before recommending a change.</p>
          </div>
          <ol className={styles.measurements}>
            {measurements.map(([title, detail], index) => (
              <li key={title}><span className={styles.number}>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div><span className={styles.cross} aria-hidden="true">+</span></li>
            ))}
          </ol>
          <div className={styles.result}><span aria-hidden="true">↳</span><p><strong>Then we test it. Together.</strong>One product. One problem. A measurable cleaning result.</p></div>
          <div className={styles.timeline}><div><strong>72<span>hr</span></strong><span>Trial follow-up</span></div><span className={styles.timelineLine} aria-hidden="true" /><div><strong>7<span>day</span></strong><span>Compare the results</span></div></div>
        </aside>
      </div>
      <ul className={styles.proof} aria-label="The United Formulas commitment">
        {["Made in Montana", "Local route delivery", "On-site product testing", "Performance guaranteed"].map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
      </ul>
    </section>
  );
}
