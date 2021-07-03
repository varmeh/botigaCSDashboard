import { ApartmentShort } from "../../../types/apartment";
import "./community-list.scss";

function CommunityHeader(): JSX.Element {
  return (
    <div className="community-header-item">
      <div className="community-header-name">COMMUNITY</div>
    </div>
  );
}

type communityItemProps = {
  apartment: any;
  selectedCommunity: string;
  setSelectedCommunity: (id: string) => void;
};

function CommunityItem({
  apartment,
  selectedCommunity,
  setSelectedCommunity,
}: communityItemProps): JSX.Element {
  const { name, _id } = apartment;
  let sellerItemClass: string = "community-item";

  if (selectedCommunity === _id) {
    sellerItemClass = `${sellerItemClass} item_selected`;
  }

  function selectCommunity(): void {
    setSelectedCommunity(_id);
  }

  return (
    <div className={sellerItemClass} onClick={selectCommunity}>
      <div className="community-name">{name}</div>
    </div>
  );
}

type communityListProps = {
  apartments: ApartmentShort[];
  selectedCommunity: string;
  setSelectedCommunity: (id: string) => void;
};

export default function CommunityList({
  apartments,
  selectedCommunity,
  setSelectedCommunity,
}: communityListProps): JSX.Element {
  return (
    <div className="community-list-style">
      <CommunityHeader />
      <div className="community-list-body">
        {apartments.map((_apt) => (
          <CommunityItem
            key={_apt._id}
            apartment={_apt}
            selectedCommunity={selectedCommunity}
            setSelectedCommunity={setSelectedCommunity}
          />
        ))}
      </div>
    </div>
  );
}
