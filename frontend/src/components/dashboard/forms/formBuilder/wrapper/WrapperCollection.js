import { Stack } from "@mui/material";
import Wrapper from "./Wrapper";

const WrapperCollection = (props) => {

  const moveItemFactory = (direction) => {
    return (index) => {
      const updatedCollection = [...props.collection];
      if (
        (direction === -1 && index === 0) ||
        (direction === 1 && index === updatedCollection.length - 1)
      ) return;
      const temp = updatedCollection[index + direction];
      updatedCollection[index + direction] = updatedCollection[index];
      updatedCollection[index] = temp;
      props.reportCollectionChange(updatedCollection);
    };
  };

  const deleteItem = (index) => {
    const updatedCollection = [...props.collection].filter((item, i) => i !== index);
    props.reportCollectionChange(updatedCollection);
  };

  const selectItem = (index) => {
    props.reportIndexChange(index);
  };

  return (
    <Stack width={"100%"} spacing={1} p={1}>
      {props.addControl}
      {props.collection.map((item, index) => (
        <Wrapper
          key={Math.random()}
          valid={item.valid}
          content={props.generateContent(item)}
          index={index}
          currentSelectedIndex={props.currentSelectedIndex}
          moveItemUp={moveItemFactory(-1)}
          moveItemDown={moveItemFactory(1)}
          deleteItem={deleteItem}
          selectItem={selectItem}
        />
      ))}
    </Stack>
  );
};

export default WrapperCollection;