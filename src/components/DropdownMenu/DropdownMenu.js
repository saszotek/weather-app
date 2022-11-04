import "../../styles/dropdownmenu.scss";

function DropdownMenu({
  isOpen,
  updatedLocations,
  handleDropdownInput,
  handleDropdownDelete,
}) {
  return (
    <div className={`dropdown-menu ${isOpen ? "active" : "inactive"}`}>
      <ul>
        {updatedLocations.map((updatedLocation, index) => {
          return (
            <li key={index}>
              <div
                onClick={() => {
                  handleDropdownInput(updatedLocation);
                }}
              >
                {updatedLocation}
              </div>
              <div
                onClick={() => {
                  handleDropdownDelete(index);
                }}
              >
                X
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownMenu;
