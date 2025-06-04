import Link from 'next/link';

// Placeholder Icons
const FacebookIcon = () => <span className="text-xl">📘</span>;
const TwitterIcon = () => <span className="text-xl">🐦</span>;
const InstagramIcon = () => <span className="text-xl">📸</span>;
const TikTokIcon = () => <span className="text-xl">🎵</span>;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'SharEat',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Impact', href: '/impact' },
        { label: 'Safety & Quality', href: '/safety' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help & Support', href: '/support' },
        { label: 'Contact Us', href: '/support#contact' }, // Example anchor
        { label: 'FAQs', href: '/support#faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '/legal#terms' },
        { label: 'Privacy Policy', href: '/legal#privacy' },
        { label: 'Cookie Policy', href: '/legal#cookies' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Become a Seller', href: '/select-role' },
        { label: 'Partner as NGO', href: '/select-role' },
        { label: 'Donate', href: '/donate' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Slogan (Optional, can be part of first column) */}
          <div className="col-span-2 lg:col-span-1 mb-6 lg:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary font-display mb-2 inline-block">
              SharEat
            </Link>
            <p className="text-sm text-gray-400">A meal saved is a life saved.</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold text-white mb-3 uppercase tracking-wider text-sm">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} SharEat. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary"><FacebookIcon /></Link>
            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary"><TwitterIcon /></Link>
            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary"><InstagramIcon /></Link>
            <Link href="#" aria-label="TikTok" className="text-gray-400 hover:text-primary"><TikTokIcon /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}