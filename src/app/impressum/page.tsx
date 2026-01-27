import Link from "next/link";

export default function Impressum() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Impressum</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Angaben gemäß § 5 TMG</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Proofa GmbH i.G.</strong> (in Gründung)<br />
                            [Address - Please Update]<br />
                            481xx Münster<br />
                            Germany
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Vertreten durch:</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            [Founder Name - Please Update] (Geschäftsführer)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Kontakt</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            E-Mail: <a href="mailto:privacy@proofa.tech" className="text-primary hover:underline">privacy@proofa.tech</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Registereintrag</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Eintragung im Handelsregister (in Vorbereitung).<br />
                            Registergericht: Amtsgericht Münster<br />
                            Registernummer: [HRB Number - Pending]
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Umsatzsteuer-ID</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                            [VAT ID - Pending/Optional during founding]
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            [Founder Name - Please Update]<br />
                            [Address - Please Update]<br />
                            481xx Münster
                        </p>
                    </section>

                    <section className="mt-12 pt-8 border-t border-border">
                        <h2 className="text-xl font-semibold mb-4 text-foreground">Haftungsausschluss (Disclaimer)</h2>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Haftung für Inhalte</h3>
                        <p className="text-muted-foreground text-sm">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Haftung für Links</h3>
                        <p className="text-muted-foreground text-sm">
                            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border mt-12">
                        <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                            &larr; Back to Home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
