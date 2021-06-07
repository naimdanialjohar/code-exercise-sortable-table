import * as React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import PeopleIcon from "@material-ui/icons/People";

import "./table.scss";

// declared types for easier references
type TableData = {
  id: number;
  employeeId: string;
  firstname: string;
  lastname: string;
  dateJoined: string;
  salary: number;
};

type Header = {
  name: string;
  icon: () => void;
  onClick: () => void;
};

type SortColumn = {
  columnName: string;
  descending: boolean;
  showIcon: boolean;
};

const Table: React.FC = () => {
  const [tableData, setTableData] = React.useState([] as TableData[]);
  const [sortDescending, setSortDescending] = React.useState([
    {
      columnName: "Full Name",
      descending: true,
      showIcon: false,
    },
    {
      columnName: "Date Joined",
      descending: true,
      showIcon: true,
    },
    {
      columnName: "Salary",
      descending: true,
      showIcon: false,
    },
  ]);

  // getting data from json
  const getData = async () => {
    const response = await fetch(
      `https://gist.githubusercontent.com/yousifalraheem/354fb07f27f3c145b78d7a5cc1f0da0b/raw/7561f6827775c6a002a93b6b99b12c3c9454a617/data.json`
    );
    const jsonData = await response.json();
    const sortedData = jsonData.sort((a: any, b: any) => {
      const firstDate: any = new Date(a.dateJoined);
      const secondDate: any = new Date(b.dateJoined);
      return secondDate - firstDate;
    });
    setTableData(sortedData);
    return jsonData;
  };

  // code was repetitive, and this function is used
  // by all columns to sort column contents based on given columnName
  const sortColumnContents = (
    columnName: string,
    key: string,
    isDate: boolean = false
  ) => {
    const column: SortColumn = sortDescending.find((item: SortColumn) => {
      return item.columnName === columnName;
    })!;

    const newArray: SortColumn[] = sortDescending.map((item: SortColumn) => {
      if (item.columnName === columnName) {
        item.descending = !item.descending;
        item.showIcon = true;
      }
      return { ...item };
    });
    setSortDescending([...newArray]);

    const sortedData = tableData.sort((a: any, b: any) => {
      if (isDate) {
        const first: any = new Date(a.dateJoined);
        const second: any = new Date(b.dateJoined);
        return column.descending ? second - first : first - second;
      } else {
        const first: string = a[key];
        const second: string = b[key];
        if (first < second) {
          return column.descending ? 1 : -1;
        } else {
          return column.descending ? -1 : 1;
        }
      }
    });
    setTableData([...sortedData]);
  };

  // to be able to differentiate between other columns
  const getIcon = (columnName: string) => {
    const column: SortColumn = sortDescending.find((item: SortColumn) => {
      return item.columnName === columnName;
    })!;

    if (!column.showIcon) {
      return;
    } else {
      return column.descending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
    }
  };

  // dynamically sort then take highest earning
  const highestEarning = () => {
    const data = [...tableData]
      .sort((a: TableData, b: TableData) => {
        return b.salary - a.salary;
      })
      .shift();

    return data ? `${data?.firstname} ${data?.lastname}` : "-";
  };

  // dynamically sort then take latest date
  const recentlyJoined = () => {
    const data = [...tableData]
      .sort((a: TableData, b: TableData) => {
        const first: any = new Date(a.dateJoined);
        const second: any = new Date(b.dateJoined);
        return second - first;
      })
      .shift();

    return data ? `${data?.firstname} ${data?.lastname}` : "-";
  };

  // declared headers in an array, instead of
  // declaring in HTML
  const headerCells: Header[] = [
    {
      name: "Full Name",
      icon: () => getIcon("Full Name"),
      onClick: () => {
        sortColumnContents("Full Name", "firstname");
      },
    },
    {
      name: "Date Joined",
      icon: () => getIcon("Date Joined"),
      onClick: () => {
        sortColumnContents("Date Joined", "dateJoined", true);
      },
    },
    {
      name: "Salary",
      icon: () => getIcon("Salary"),
      onClick: () => {
        sortColumnContents("Salary", "salary");
      },
    },
  ];

  // firstly initialise the component's state value
  // so that the table is able to populate itself
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"tableComponent"}>
      <div className="details">
        <div className={"numberOfPeople"}>
          <PeopleIcon className={"peopleIcon"} />
          {tableData ? tableData.length : 0}
        </div>
        <div className={"employeeDetails"}>
          <table>
            <tr>
              <td>Highest earning employee</td>
              <td>:</td>
              <td>{highestEarning()}</td>
            </tr>
            <tr>
              <td>Employee most recently joined</td>
              <td>:</td>
              <td>{recentlyJoined()}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className={"tableHeader"}>
        <div>
          {headerCells.map((item, index) => {
            return (
              <div key={index} onClick={item.onClick}>
                {item.name} {item.icon()}
              </div>
            );
          })}
        </div>
      </div>
      <div className={"tableBody"}>
        {tableData.map((item, index) => {
          return (
            <div key={index}>
              <div>
                {item.firstname} {item.lastname}
              </div>
              <div>
                {new Date(item.dateJoined).toLocaleString("en-US", {
                  day: "numeric",
                  year: "numeric",
                  month: "long",
                })}
              </div>
              <div>{item.salary}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
