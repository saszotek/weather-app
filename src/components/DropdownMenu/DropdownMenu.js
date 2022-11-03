import "../../styles/dropdownmenu.scss";

function DropdownMenu({ isOpen, updatedLocations, handleDropdownInput }) {
  return (
    <div className={`dropdown-menu ${isOpen ? "active" : "inactive"}`}>
      <ul>
        {updatedLocations.map((updatedLocation, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleDropdownInput(updatedLocation);
              }}
            >
              {updatedLocation}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownMenu;
