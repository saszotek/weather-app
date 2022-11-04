import "../../styles/dropdownmenu.scss";

function DropdownMenu({
  isOpen,
  updatedLocations,
  handleDropdownInput,
  handleDropdownDelete,
}) {
  if (!(updatedLocations.length === 0)) {
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
  } else {
    return (
      <div className={`dropdown-menu ${isOpen ? "active" : "inactive"}`}>
        <div className="dropdown-menu__empty">The list is empty</div>
      </div>
    );
  }
}

export default DropdownMenu;
