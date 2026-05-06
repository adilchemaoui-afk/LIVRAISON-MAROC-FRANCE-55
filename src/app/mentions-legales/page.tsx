export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Mentions légales</h1>
      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Éditeur du site</h2>
          <p>Raison sociale : Transport Maroc 2 SARL</p>
          <p>SIRET : 123 456 789 00012</p>
          <p>RCS : Paris B 123 456 789</p>
          <p>TVA intracommunautaire : FR12 123 456 789</p>
          <p>Capital social : 1 000 €</p>
          <p>Directeur de la publication : M. Ahmed Benali</p>
          <p>Siège social : 7 Rue de la Noue, 93170 Bagnolet, France</p>
          <p>Téléphone : 07 53 25 68 97</p>
          <p>Email : adc.lecolibri@gmail.com</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Hébergement</h2>
          <p>Hébergeur : Vercel Inc.</p>
          <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
          <p>Site : <a href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de Transport Maroc 2 SARL. Toute reproduction ou représentation, totale ou partielle, est interdite sans autorisation préalable.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Données personnelles</h2>
          <p>Les données collectées sont nécessaires à la gestion de vos envois et au respect de nos obligations légales. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à adc.lecolibri@gmail.com.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Conditions de transport</h2>
          <p>Transport Maroc 2 SARL assure le transport de colis entre la France et le Maroc selon les conditions définies au moment de la commande. Les délais indicatifs sont donnés à titre informatif et ne constituent pas un engagement contractuel.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Paiement</h2>
          <p>Les paiements sont sécurisés via Stripe. Transport Maroc 2 SARL ne conserve aucune donnée bancaire. Les transactions sont chiffrées et conformes aux normes PCI-DSS.</p>
        </section>
      </div>
    </div>
  );
}
