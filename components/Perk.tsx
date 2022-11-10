import { PerkType } from 'types'

const Perk = ({ perk }: { perk: PerkType }) => {
  return (
    <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
      <div className="md:flex-shrink-0">
        <div className="flow-root">
          <img
            className="-my-1 mx-auto h-24 w-auto"
            src={perk?.imageUrl}
            alt=""
          />
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
          {perk?.name}
        </h3>
        <p className="mt-3 text-sm text-gray-500">{perk?.description}</p>
      </div>
    </div>
  )
}

export default Perk
