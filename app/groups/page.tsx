"use client";

import { useState } from "react";
import { ListGroup, Table, Dropdown, Select } from "flowbite-react";

const listArray = [
  "Laura Brown",
  "Ethan Christ",
  "Spencer Cook",
  "Chance Creger",
  "Erik Edin",
  "Bryn Glotfelty",
  "Daniel Goss",
  "Halden Kavanagh",
  "Gabriel Latimer",
  "Aaron Lyman",
  "Patrick Mulville",
  "Zachary Short",
  "Maguire Wilson",
];

interface Group { name: string, items: Array<string> }

const Groups = () => {
  const [groups, setGroups] = useState([
    { name: "Group 1", items: [] },
    { name: "Group 2", items: [] },
    { name: "Group 3", items: [] },
    { name: "Group 4", items: [] },
  ]);

  const handleSelect = (e: any) => {
    const newGroups = [...groups];
    const val = e.target.value.split(' ');
    const index = parseInt(val[0])-1;
    val.shift();
    const itemName = val.join(' ');
    // remove item from all groups
    newGroups.forEach((group: Group) => {
      group.items = group.items.filter((item: string) => item !== itemName);
    });
    // add item to selected group
    newGroups[index].items.push(itemName);
    setGroups(newGroups);
  };

  return (
    <div className="container mx-auto columns-1">
      <div className="md:w-1/2 mx-auto py-6 ">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell className="w-40">Group</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {listArray.map((item, index) => {
              return (
                <Table.Row key={`listItem${index + 1}`}>
                  <Table.Cell>{item}</Table.Cell>
                  <Table.Cell>
                    <Select 
                      onChange={handleSelect}
                    >
                      <option value=''></option>
                      <option value={`1 ${item}`}>Group 1</option>
                      <option value={`2 ${item}`}>Group 2</option>
                      <option value={`3 ${item}`}>Group 3</option>
                      <option value={`4 ${item}`}>Group 4</option>
                    </Select>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="grid grid-cols-4 pb-6">
        <div className="">
          <h5 className="text-center">Group 1</h5>
          <ListGroup className="w-48 mx-auto">
            {groups[0].items.map((item: string, index: number) => (
              <ListGroup.Item>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="">
          <h5 className="text-center">Group 2</h5>
          <ListGroup className="w-48 mx-auto">
          {groups[1].items.map((item: string, index: number) => (
              <ListGroup.Item>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="">
          <h5 className="text-center">Group 3</h5>
          <ListGroup className="w-48 mx-auto">
          {groups[2].items.map((item: string, index: number) => (
              <ListGroup.Item>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="">
          <h5 className="text-center">Group 4</h5>
          <ListGroup className="w-48 mx-auto">
          {groups[3].items.map((item: string, index: number) => (
              <ListGroup.Item>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Groups;
