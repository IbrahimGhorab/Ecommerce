import Perk from './Perk'
import { PerkType } from 'types'

const Perks = () => {
  const perks: PerkType[] = [
    {
      name: 'Free returns',
      imageUrl:
        'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
      description:
        'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
      name: 'Same day delivery',
      imageUrl:
        'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
      description:
        'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
      name: 'All year discount',
      imageUrl:
        'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
      description:
        'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
      name: 'For the planet',
      imageUrl:
        'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
      description:
        'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
  ]

  return (
    <>
      <h2 id="perks-heading" className="sr-only">
        Our perks
      </h2>

      <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <Perk key={perk.name} perk={perk} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Perks
