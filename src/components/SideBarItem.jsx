import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer"
  },
  textSection: {
    maxWidth: "85%"
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red"
    }
  }
}));

const SideBarItem = ({
  index,
  note,
  selectedNoteIndex,
  selectNote,
  deleteNote
}) => {
  const classes = useStyles();

  // const selectNote = (note, index) => {
  //   selectNote(note, index);
  // };

  // const deleteNote = (note, index) => {};

  return (
    <div key={index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => deleteNote(note)}
          className={classes.deleteIcon}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default SideBarItem;
