import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Placeholder icons - replace with actual SVG components or an icon library
const ConsumerIcon = () => <span className="text-3xl">🛍️</span>;
const SellerIcon = () => <span className="text-3xl">🏪</span>;
const NgoIcon = () => <span className="text-3xl">❤️</span>;

export default function SelectRolePage() {
  const roles = [
    {
      name: 'Consumer',
      icon: <ConsumerIcon />,
      description: 'Buy or Donate Food Deals',
      slogan: 'Poa Deals za Jioni!',
      href: '/auth?role=consumer', // Example link, adjust as needed
      borderColor: 'border-primary', // Using primary (Orange) for Consumer
    },
    {
      name: 'Seller',
      icon: <SellerIcon />,
      description: 'List Surplus Food (Restaurants, Events, Homes)',
      slogan: 'Kumaliza Stock!',
      href: '/auth?role=seller',
      borderColor: 'border-secondary', // Using secondary (Green) for Seller
    },
    {
      name: 'NGO',
      icon: <NgoIcon />,
      description: 'Receive Donations',
      slogan: 'Feed Your Community',
      href: '/auth?role=ngo',
      borderColor: 'border-premium', // Using premium (Gold) for NGO
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      {/* Placeholder for Header/Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-text-primary font-display">Choose Your Role</h1>
        <p className="text-text-secondary mt-2">How would you like to use SharEat?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-4xl mb-12">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="block group">
            <Card className={`text-center h-full flex flex-col items-center justify-between p-6 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 ${role.borderColor} border-2`}>
              <CardHeader className="items-center p-0 mb-4">
                {role.icon}
                <CardTitle className="mt-4 text-2xl">{role.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col items-center justify-center">
                <CardDescription className="text-base mb-1">{role.description}</CardDescription>
                <p className="font-semibold text-accent">{role.slogan}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Button variant="link" asChild>
        <Link href="/?guest=true">Browse as Guest</Link>
      </Button>

      {/* Placeholder for Language Toggle */}
      <div className="absolute top-6 right-6">
        <span className="text-sm text-text-secondary">(Language Toggle)</span>
      </div>
    </div>
  );
}