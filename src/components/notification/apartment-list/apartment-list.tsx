import Checkbox from "@material-ui/core/Checkbox";
import Apartment from "../../../types/apartment";

import "./apartment-list.scss";

type ApartmentListProps = {
  apartments: Apartment[];
  selectedApartements: string[];
  toggleSelectedApartment: (id: string) => void;
};
type ApartmentItemProps = {
  apartment: Apartment;
  selectedApartements: string[];
  toggleSelectedApartment: (id: string) => void;
};

function ApartmentItem({
  apartment,
  selectedApartements,
  toggleSelectedApartment,
}: ApartmentItemProps): JSX.Element {
  const { apartmentName, _id } = apartment;

  function toggleApartment(): void {
    toggleSelectedApartment(_id);
  }
  const isChecked: boolean = selectedApartements.includes(_id);

  return (
    <div className="apartment-list-item">
      <div className="apartment-chekbox">
        <Checkbox
          color="primary"
          checked={isChecked}
          onChange={toggleApartment}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className="apartment-name">{apartmentName}</div>
    </div>
  );
}

export default function ApartmentList({
  apartments,
  selectedApartements,
  toggleSelectedApartment,
}: ApartmentListProps): JSX.Element {
  return (
    <div className="apartment-list">
      {apartments.map((_apartment: Apartment) => (
        <ApartmentItem
          selectedApartements={selectedApartements}
          toggleSelectedApartment={toggleSelectedApartment}
          apartment={_apartment}
        />
      ))}
    </div>
  );
}
