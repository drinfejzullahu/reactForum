import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function Table(props) {
  console.log(props.data);
  const [datas, setDatas] = useState([]);
  let colums = [];
  useEffect(() => {
    setDatas(props.data);
    // axios
    //   .get("/api/post")
    //   .then(res => {
    //     setDatas(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });
  if (props.type === "user") {
    colums = [
      { title: "Fullname", field: "fullName" },
      { title: "Email", field: "email" },
      { title: "Username", field: "username" }
    ];
  }

  if (props.type === "post") {
    colums = [
      { title: "Title", field: "title" },
      { title: "Question", field: "question" },
      { title: "Votes", field: "votes" }
    ];
  }

  if (props.type === "room") {
    colums = [
      { title: "Name", field: "name" },
      { title: "Viewers", field: "viewers" }
    ];
  }

  return (
    <MaterialTable
      title={
        props.type.charAt(0).toUpperCase() + props.type.slice(1) + " Table"
      }
      columns={colums}
      data={datas.map(d => {
        return d;
      })}
      options={{
        filtering: true,
        search: false
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.editRow(oldData, newData);

              // if (oldData) {
              //   setState(prevState => {
              //     const data = [...prevState.data];
              //     data[data.indexOf(oldData)] = newData;
              //     return { ...prevState, data };
              //   });
              // }
            }, 600);
          }),
        onRowDelete: data =>
          new Promise(resolve => {
            resolve();
            props.deleteRow(props.type, data.id);
            // axios
            //   .delete(`/api/${props.type}/${data.id}`)
            //   .then(() => {
            //     axios
            //       .get("/api/post")
            //       .then(res => {
            //         setDatas(res.data);
            //       })
            //       .catch(err => {
            //         console.log(err);
            //       });
            //   })
            //   .catch(err => console.log(err));
          })
      }}
    />
  );
}
