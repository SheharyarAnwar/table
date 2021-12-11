import React, { useRef } from "react";
import * as data from "./dataset.json";
import classes from "./App.module.css";

interface IPerson {
  carrier: string;
  eventDate: string;
  firstName: string;
  lastName: string;
  status: IStatus;
}
type IStatus = "COMPLETE" | "ERROR" | "INCOMPLETE";
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeFilter, setActiceFilter] = React.useState<string[]>([
    "COMPLETE",
    "ERROR",
    "INCOMPLETE",
  ]);
  const ref = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const rawData: IPerson[] = data.default;
  const onFilterChange = (filter: string) => {
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setActiceFilter(newFilter);
    } else {
      setActiceFilter([...activeFilter, filter]);
    }
  };
  console.log(activeFilter);

  let header = ["First Name", "Last Name", "Carrier", "Status", "Date"].map(
    (val) => {
      return (
        <th>
          <div className={classes.org}>
            {val}
            {val === "Status" ? (
              <>
                <div
                  className={classes.drawer}
                  style={{
                    visibility: isDrawerOpen ? "visible" : "hidden",
                  }}
                >
                  {["Complete", "Incomplete", "Error"].map((val) => {
                    let filterValue = val.toUpperCase();
                    return (
                      <label>
                        <input
                          type="checkbox"
                          name="checkbox"
                          value={filterValue}
                          checked={activeFilter.includes(filterValue)}
                          onClick={() => onFilterChange(filterValue)}
                        />
                        {val}
                      </label>
                    );
                  })}
                </div>
                <div
                  className={classes.arrow}
                  ref={ref}
                  onClick={() => {
                    setIsDrawerOpen((prev) => !prev);
                    ref!.current!.animate([{ transform: "rotate(180deg)" }], {
                      duration: 200,
                    });
                  }}
                ></div>
              </>
            ) : null}
          </div>
        </th>
      );
    }
  );
  const renderBody = () => {
    return rawData.map(
      ({ carrier, firstName, lastName, eventDate, status }, i) => {
        if (activeFilter.includes(status)) {
          return (
            <tr key={i}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{carrier}</td>
              <td>{status}</td>
              <td>{eventDate}</td>
            </tr>
          );
        } else {
          return null;
        }
      }
    );
  };
  return (
    <>
      <div className={classes.bg}>
        <div className={classes.tableWrapper}>
          <table>
            <thead>{header}</thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
